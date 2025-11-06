
import React, { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { CloseIcon } from './Icons';

interface AddEditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerData: Omit<Customer, 'id' | 'bills'>, id?: number) => void;
  customerToEdit: Customer | null;
}

const AddEditCustomerModal: React.FC<AddEditCustomerModalProps> = ({ isOpen, onClose, onSubmit, customerToEdit }) => {
  const [name, setName] = useState('');
  const [baseBill, setBaseBill] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [dueDateDay, setDueDateDay] = useState('');

  useEffect(() => {
    if (customerToEdit) {
      setName(customerToEdit.name);
      setBaseBill(customerToEdit.baseBill.toString());
      setWhatsappNumber(customerToEdit.whatsappNumber || '');
      setDueDateDay(customerToEdit.dueDateDay.toString());
    } else {
      setName('');
      setBaseBill('');
      setWhatsappNumber('');
      setDueDateDay('');
    }
  }, [customerToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !baseBill || !dueDateDay) {
      alert('Nama, Tagihan Dasar, dan Jatuh Tempo harus diisi.');
      return;
    }
    const dueDateDayNum = parseInt(dueDateDay, 10);
    if (dueDateDayNum < 1 || dueDateDayNum > 31) {
      alert('Jatuh Tempo harus antara 1 dan 31.');
      return;
    }

    onSubmit(
      { name, baseBill: parseInt(baseBill, 10), whatsappNumber, dueDateDay: dueDateDayNum },
      customerToEdit?.id
    );
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {customerToEdit ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="baseBill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagihan Dasar (Rp)</label>
              <input
                type="number"
                id="baseBill"
                value={baseBill}
                onChange={(e) => setBaseBill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDateDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jatuh Tempo (Tanggal)</label>
              <input
                type="number"
                id="dueDateDay"
                value={dueDateDay}
                onChange={(e) => setDueDateDay(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., 20"
                min="1"
                max="31"
                required
              />
            </div>
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. WhatsApp (Opsional)</label>
              <input
                type="text"
                id="whatsappNumber"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., 628123456789"
              />
            </div>
          </div>
          <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              {customerToEdit ? 'Simpan Perubahan' : 'Tambah Pelanggan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCustomerModal;
