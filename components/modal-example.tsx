import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Award } from "lucide-react"

export default function ModalExample() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg">
          Ver Detalhes da Promoção
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center gap-4 mb-4">
          <Award className="h-8 w-8 text-primary" />
          <DialogTitle>Promoção Especial</DialogTitle>
        </div>
        <DialogDescription>
          <p className="mb-2">Desconto de R$ 0,20 no Etanol em dias selecionados.</p>
          <p className="text-sm text-gray-500">Válido de segunda a quarta-feira, das 10h às 16h.</p>
        </DialogDescription>
        <div className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
} 