import React from "react";
import {
  Store, BriefcaseBusiness, Factory, ShoppingCart, Building2, Landmark, Ship, BadgeCheck,
  Receipt, Calculator, Stamp, Building, ShieldCheck, FileCheck, PiggyBank, Crown,
  ArrowLeftRight, Globe2, Users, CreditCard, Circle
} from "lucide-react";

const MAP = {
  Store, BriefcaseBusiness, Factory, ShoppingCart, Building2, Landmark, Ship, BadgeCheck,
  Receipt, Calculator, Stamp, Building, ShieldCheck, FileCheck, PiggyBank, Crown,
  ArrowLeftRight, Globe2, Users, CreditCard, Circle
};

type Props = {
  name?: string;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({ name, className = "w-5 h-5", strokeWidth = 1.4 }: Props) {
  const Cmp = (MAP as Record<string, any>)[name ?? ""] || Circle;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}