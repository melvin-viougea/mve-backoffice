import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, Payment} from "@/types";
import {getAllPayment} from "@/lib/actions/payment.actions"

export const PaymentDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selected, setSelected] = useState<Payment | undefined>(undefined);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const fetchedPayments = await getAllPayment();
        setPayments(fetchedPayments);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    if (payments.length > 0 && !selected) {
      const defaultPayment = payments.find(payment => payment.id.toString() == defaultValue) || payments[0];
      setSelected(defaultPayment);
      if (setValue) {
        setValue("payment", defaultPayment.id);
      }
    }
  }, [payments, selected, setValue]);

  const handlePaymentChange = (id: string) => {
    const payment = payments.find((payment) => payment.id.toString() === id);

    if (payment) {
      setSelected(payment);
      if (setValue) {
        setValue("payment", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handlePaymentChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type de paiement</SelectLabel>
          {payments.map((payment: Payment) => (
            <SelectItem key={payment.id} value={payment.id.toString()} className="cursor-pointer border-t">
              {payment.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
