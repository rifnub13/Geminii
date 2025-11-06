
export type BillStatus = 'LUNAS' | 'BELUM LUNAS';

export interface Bill {
  paymentMonth: string;
  status: BillStatus;
  paymentDate: string | null;
  dueDate: string;
  baseBill: number;
}

export interface Customer {
  id: number;
  name: string;
  baseBill: number;
  whatsappNumber: string;
  dueDateDay: number;
  bills: Bill[];
}
