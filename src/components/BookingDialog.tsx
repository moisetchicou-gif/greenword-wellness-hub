import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Phone, User, MessageSquare, Check } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(80, "Nom trop long"),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro invalide")
    .max(20, "Numéro invalide")
    .regex(/^[+0-9\s().-]+$/, "Format invalide"),
  date: z.date({ required_error: "Choisissez une date" }),
  slot: z.string().min(1, "Choisissez un créneau"),
  notes: z.string().max(500, "Max 500 caractères").optional(),
});

interface BookingDialogProps {
  offerName: string;
  trigger: React.ReactNode;
}

const WHATSAPP_NUMBER = "2250715736370";

const BookingDialog = ({ offerName, trigger }: BookingDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setFullName("");
    setPhone("");
    setDate(undefined);
    setSlot("");
    setNotes("");
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = bookingSchema.safeParse({ fullName, phone, date, slot, notes });
    if (!parsed.success) {
      const first = parsed.error.errors[0]?.message ?? "Formulaire invalide";
      toast({ title: "Vérifiez votre saisie", description: first, variant: "destructive" });
      return;
    }

    const d = format(parsed.data.date, "EEEE d MMMM yyyy", { locale: fr });
    const message = [
      `Bonjour Green World, je souhaite réserver une séance.`,
      ``,
      `• Prestation : ${offerName}`,
      `• Nom : ${parsed.data.fullName}`,
      `• Téléphone : ${parsed.data.phone}`,
      `• Date souhaitée : ${d}`,
      `• Créneau : ${parsed.data.slot}`,
      parsed.data.notes ? `• Notes : ${parsed.data.notes}` : null,
      ``,
      `Merci de me confirmer la disponibilité.`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    toast({
      title: "Demande envoyée",
      description: "Nous vous confirmons votre rendez-vous sur WhatsApp.",
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Réserver une séance</DialogTitle>
          <DialogDescription>
            <span className="text-primary font-medium">{offerName}</span> — choisissez votre date et votre créneau.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 text-primary flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-display text-lg text-foreground">Demande envoyée !</p>
              <p className="text-sm text-muted-foreground">
                Votre conversation WhatsApp s'est ouverte. Nous confirmons votre créneau dans les meilleurs délais.
              </p>
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>Fermer</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs">
                <User className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Nom complet
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Aïcha Koné"
                maxLength={80}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs">
                <Phone className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+225 07 00 00 00 00"
                maxLength={20}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">
                <CalendarIcon className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Date souhaitée
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => {
                      const day = d.getDay();
                      return d < today || day === 0; // pas le dimanche
                    }}
                    initialFocus
                    locale={fr}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Créneau horaire</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={cn(
                      "px-2 py-2 rounded-md text-xs font-medium border transition-all",
                      slot === s
                        ? "bg-primary text-primary-foreground border-primary shadow"
                        : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-secondary/50",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs">
                <MessageSquare className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Message (optionnel)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Précisez vos attentes ou contraintes…"
                maxLength={500}
                rows={3}
              />
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Envoyer ma demande
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
