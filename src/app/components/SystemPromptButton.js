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
        className="w-full px-3 py-3 rounded-2xl bg-gray-900 hover:bg-gray-700 transition duration-300 shadow-md"
      >
       {t('ManageSystemPrompt')}
      </button>
      <SystemPromptModal  isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
