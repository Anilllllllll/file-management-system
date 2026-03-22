import { 
  Home, FileText, Receipt, Lightbulb, 
  BarChart2, DollarSign, Scale, Users, 
  Image as ImageIcon, Presentation, Table, 
  Mail, ClipboardList, Folder
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'Home', name: 'Home', icon: Home },
  { id: 'Invoices', name: 'Invoices', icon: FileText },
  { id: 'Receipts', name: 'Receipts', icon: Receipt },
  { id: 'Contracts', name: 'Contracts', icon: Lightbulb },
  { id: 'Agreements', name: 'Agreements', icon: ClipboardList },
  { id: 'Reports', name: 'Reports', icon: BarChart2 },
  { id: 'Financial', name: 'Financial', icon: DollarSign },
  { id: 'Legal', name: 'Legal', icon: Scale },
  { id: 'HR', name: 'HR', icon: Users },
  { id: 'Images', name: 'Images', icon: ImageIcon },
  { id: 'Presentations', name: 'Presentations', icon: Presentation },
  { id: 'Spreadsheets', name: 'Spreadsheets', icon: Table },
  { id: 'Letters', name: 'Letters', icon: Mail },
  { id: 'Forms', name: 'Forms', icon: ClipboardList },
  { id: 'General', name: 'General', icon: Folder },
];
