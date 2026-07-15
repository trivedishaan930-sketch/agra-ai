import { RouterPipeline } from "@/router/pipeline";
import type { RouterInput, RoutingDecision } from "@/router/types";

export class RouterEngine {
  private readonly pipeline: RouterPipeline;

  constructor(pipeline = new RouterPipeline()) {
    this.pipeline = pipeline;
  }

  route(input: RouterInput): RoutingDecision {
    return this.pipeline.route(input);
  }
}

export const routerEngine = new RouterEngine();
