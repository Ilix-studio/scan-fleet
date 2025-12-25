// components/ReferenceCodePanel.tsx

import { FileCode, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReferenceCodePanelProps {
  referenceCode: string | null;
  isSaving: boolean;
  canSave: boolean;
  onSave: () => void;
}

export const ReferenceCodePanel = ({
  referenceCode,
  isSaving,
  canSave,
  onSave,
}: ReferenceCodePanelProps) => {
  return (
    <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <FileCode size={18} className='text-cyan-400' />
        <span className='text-sm font-medium text-white'>Reference Code</span>
      </div>

      {referenceCode ? (
        <div className='flex items-center justify-between bg-white/10 rounded-lg p-3'>
          <span className='font-mono text-lg text-cyan-400'>
            {referenceCode}
          </span>
          <span className='text-xs text-green-400'>Saved</span>
        </div>
      ) : (
        <Button
          onClick={onSave}
          disabled={isSaving || !canSave}
          className='w-full bg-white/10 hover:bg-white/20 border border-white/20'
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className='mr-2 animate-spin' />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className='mr-2' />
              Save & Get Code
            </>
          )}
        </Button>
      )}

      <p className='text-xs text-white/50 mt-2 text-center'>
        {referenceCode
          ? "Code valid for 4 days. Use at checkout."
          : "Save to get a reference code for checkout"}
      </p>
    </div>
  );
};
