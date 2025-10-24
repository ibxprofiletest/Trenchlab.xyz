import { X } from 'lucide-react';
import type { Decision } from '../types';

interface DecisionModalProps {
  decision: Decision;
  onClose: () => void;
}

export default function DecisionModal({ decision, onClose }: DecisionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border-4 border-border max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="border-b-2 border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-10 border-2 border-border"
              style={{ backgroundColor: decision.modelColor }}
            />
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {decision.modelName} - {decision.decision}
              </h2>
              <p className="text-sm text-muted-foreground">{decision.timestamp}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {decision.token && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground mb-2">
                  TOKEN
                </h3>
                <p className="text-lg font-bold text-foreground">{decision.token}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-2">
                DECISION
              </h3>
              <span
                className={`inline-block px-4 py-2 text-sm font-bold border-2 border-border ${
                  decision.decision === 'FADE'
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {decision.decision}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-2">
                FULL REASONING
              </h3>
              <div className="bg-background border-2 border-border p-4">
                <p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap break-words">
                  {decision.reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t-2 border-border px-6 py-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
