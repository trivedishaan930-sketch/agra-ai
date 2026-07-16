export type TruthObservabilityEventKind =
  | "execution-metric"
  | "analyzer-metric"
  | "performance-metric"
  | "timing-metric"
  | "pipeline-metric"
  | "diagnostic-event"
  | "trace"
  | "health-metric";

export type TruthObservabilityEvent = Readonly<{
  id: string;
  kind: TruthObservabilityEventKind;
  timestamp: string;
  telemetryImplemented: false;
  metadata: Readonly<Record<string, string | number | boolean>>;
}>;

export interface TruthObservabilitySink {
  readonly telemetryImplemented: false;
  record(event: TruthObservabilityEvent): TruthObservabilityEvent;
}

export const disabledTruthObservabilitySink: TruthObservabilitySink = {
  telemetryImplemented: false,
  record(event) {
    return Object.freeze(event);
  },
};
