import { Centrifuge, ConnectionTokenContext } from "centrifuge";
import { DexRequestContext } from "..";


export interface Unsubscrible {
  unsubscribe(): void;
}

export class StreamApi {
  private realtimeClient: Centrifuge;
  private listenersMap: Map<string, Set<(data: any) => void>>;

  constructor(context: DexRequestContext) {
    const realtimeEndpoint = context.streamUrl;
    this.realtimeClient = new Centrifuge(realtimeEndpoint, {
      getToken: async (_ctx: ConnectionTokenContext) => {
        return context.accessToken as string;
      },
    });

    this.realtimeClient.on("connected", () => {
      console.log("[streaming] connected");
    }).on("disconnected", (err) => {
      console.warn("[streaming] disconnected", err);
    }).on("error", (err) => {
      console.error("[streaming] error: ", err);
    });

    this.listenersMap = new Map();
  }

  connect() {
    this.realtimeClient.connect();
  }

  subscribe(channel: string, fn: (data: any) => void) {
    let sub = this.realtimeClient.getSubscription(channel);
    let listeners = this.listenersMap.get(channel);

    if (!sub) {
      listeners = new Set();
      this.listenersMap.set(channel, listeners);

      console.log("[xrealtime] create new sub: ", channel);
      sub = this.realtimeClient.newSubscription(channel, {
        delta: "fossil",
      });

      sub.on("subscribed", () => {
        console.log("[xrealtime] subscribed", channel);
      }).on("unsubscribed", () => {
        console.log("[xrealtime] unsubscribed", channel);
      }).on("publication", (ctx) => {
        // console.log('[xrealtime] publication, ctx.data: ', ctx.data);
        listeners?.forEach((it) => it(ctx.data));
      }).subscribe();
    }

    listeners?.add(fn);
  }

  unsubscribe(channel: string, fn: (data: any) => void) {
    const listeners = this.listenersMap.get(channel);
    if (!listeners) {
      return;
    }

    listeners.delete(fn);
    console.log("unsubscribe, remain listeners: ", listeners.size);

    if (listeners.size === 0) {
      console.log("unsubscribe channel: ", channel);

      const sub = this.realtimeClient.getSubscription(channel);
      if (sub) {
        sub.unsubscribe();
        this.realtimeClient.removeSubscription(sub);
      }

      this.listenersMap.delete(channel);
    }
  }
}