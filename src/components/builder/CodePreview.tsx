import { useState } from 'react';
import { X, Copy, Download, Check, Shield, Fuel, AlertTriangle } from 'lucide-react';
import { GeneratedContract } from '../../types';
import toast from 'react-hot-toast';

interface CodePreviewProps {
  contract: GeneratedContract;
  onClose: () => void;
}

export default function CodePreview({ contract, onClose }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'abi' | 'security'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contract.sourceCode);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([contract.sourceCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contract.name.replace(/\s+/g, '')}.sol`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col animate-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">{contract.name}.sol</h2>
            <p className="text-sm text-slate-400 mt-1">
              Solidity {contract.compiler.version} • Optimizer: {contract.compiler.optimizer.runs} runs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-secondary"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleDownload} className="btn-secondary">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 px-4 py-2 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'code'
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Source Code
          </button>
          <button
            onClick={() => setActiveTab('abi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'abi'
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            ABI
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Security Report
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'code' && (
            <pre className="p-4 bg-slate-900 rounded-lg text-sm text-slate-300 overflow-x-auto font-mono">
              <code>{contract.sourceCode}</code>
            </pre>
          )}

          {activeTab === 'abi' && (
            <pre className="p-4 bg-slate-900 rounded-lg text-sm text-slate-300 overflow-x-auto font-mono">
              <code>{JSON.stringify(contract.abi, null, 2)}</code>
            </pre>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Security Score */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        contract.securityReport.score >= 80
                          ? 'bg-green-500/10'
                          : contract.securityReport.score >= 50
                          ? 'bg-yellow-500/10'
                          : 'bg-red-500/10'
                      }`}
                    >
                      <Shield
                        className={`w-8 h-8 ${
                          contract.securityReport.score >= 80
                            ? 'text-green-400'
                            : contract.securityReport.score >= 50
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {contract.securityReport.score}/100
                      </p>
                      <p className="text-sm text-slate-400">Security Score</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-orange-400" />
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {contract.gasEstimates.deployment.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">Est. Gas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues */}
              {contract.securityReport.issues.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Issues Found</h3>
                  <div className="space-y-3">
                    {contract.securityReport.issues.map((issue, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          issue.severity === 'critical'
                            ? 'bg-red-500/10 border-red-500/30'
                            : issue.severity === 'high'
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : issue.severity === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-blue-500/10 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`w-5 h-5 mt-0.5 ${
                              issue.severity === 'critical'
                                ? 'text-red-400'
                                : issue.severity === 'high'
                                ? 'text-orange-400'
                                : issue.severity === 'medium'
                                ? 'text-yellow-400'
                                : 'text-blue-400'
                            }`}
                          />
                          <div>
                            <p className="font-medium text-white">{issue.title}</p>
                            <p className="text-sm text-slate-400 mt-1">
                              {issue.description}
                            </p>
                            <p className="text-sm text-primary-400 mt-2">
                              Recommendation: {issue.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passed Checks */}
              {contract.securityReport.passedChecks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Passed Checks
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {contract.securityReport.passedChecks.map((check, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-green-500/10 rounded-lg"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Generated with OpenZeppelin Contracts
          </p>
          <button onClick={onClose} className="btn-primary">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
