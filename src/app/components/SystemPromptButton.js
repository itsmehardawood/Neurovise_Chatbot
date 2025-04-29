'use client';
import { useState } from 'react';
import SystemPromptModal from './Systemmodal';
import { useTranslation } from '@/lib/translations';

export default function SystemPromptButton({locale}) {
  const [open, setOpen] = useState(false);
  const t = useTranslation(locale);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
      >
       {t('ManageSystemPrompt')}
      </button>
      <SystemPromptModal  isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
