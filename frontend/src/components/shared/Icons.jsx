import React from 'react';
import {
  Star,
  Book,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  Eye,
  Heart,
  MessageCircle,
  Check,
  Copy,
  DollarSign,
  TrendingUp,
  Mail,
  Twitter,
  Share2,
  ArrowRight
} from 'lucide-react';

export const Icons = {
  Star,
  Book,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  Eye,
  Heart,
  MessageCircle,
  Check,
  Copy,
  DollarSign,
  TrendingUp,
  Mail,
  Twitter,
  Share2,
  ArrowRight
};

export const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons[name];
  return LucideIcon ? <LucideIcon {...props} /> : null;
};