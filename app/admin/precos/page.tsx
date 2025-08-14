"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { db, auth } from "@/lib/firebase"
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore"
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react"

interface Preco {
  id: string
  tipo: string
  valor: number
  createdBy?: string | null
  createdByEmail?: string | null
}

const tiposCombustivel = ["Gasolina", "Etanol", "Diesel"]

export default function PrecosAdmin() {
  const [precos, setPrecos] = useState<Preco[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editando, setEditando] = useState<Preco | null>(null)
  const [showConfirm, setShowConfirm] = useState<{id: string, tipo: string} | null>(null)
  const [form, setForm] = useState({ tipo: "Gasolina", valor: "" })
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [sortBy, setSortBy] = useState<"tipo" | "valor">("tipo")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchPrecos()
  }, [])

  async function fetchPrecos() {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, "precos"))
      const precosData: Preco[] = []
      querySnapshot.forEach((doc) => {
        precosData.push({ id: doc.id, ...doc.data() } as Preco)
      })
      setPrecos(precosData)
    } catch (error) {
      console.error('Erro ao carregar preços:', error)
      toast({ title: "Erro ao carregar preços", variant: "destructive" })
    }
    setLoading(false)
  }

  function openAddModal() {
    setEditando(null)
    setForm({ tipo: "Gasolina", valor: "" })
    setShowModal(true)
  }

  function openEditModal(preco: Preco) {
    setEditando(preco)
    setForm({ tipo: preco.tipo, valor: preco.valor.toString() })
    setShowModal(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      if (editando) {
        await updateDoc(doc(db, "precos", editando.id), { 
          tipo: form.tipo, 
          valor: parseFloat(form.valor),
          updatedAt: new Date().toISOString(),
          updatedBy: auth.currentUser?.uid || null,
          updatedByEmail: auth.currentUser?.email || null
        })
        toast({ title: "Preço atualizado com sucesso!" })
      } else {
        await addDoc(collection(db, "precos"), { 
          tipo: form.tipo, 
          valor: parseFloat(form.valor),
          createdAt: new Date().toISOString(),
          createdBy: auth.currentUser?.uid || null,
          createdByEmail: auth.currentUser?.email || null
        })
        toast({ title: "Preço adicionado com sucesso!" })
      }
      setShowModal(false)
      fetchPrecos()
    } catch (error: any) {
      const code = error?.code || "unknown"
      if (code === "permission-denied") {
        toast({ title: "Ação não permitida", description: "Você precisa de permissão de administrador para alterar preços.", variant: "destructive" })
      } else if (code === "unauthenticated") {
        toast({ title: "Sessão expirada", description: "Faça login novamente para continuar.", variant: "destructive" })
      } else {
        console.error('Erro ao salvar preço:', error)
        toast({ title: "Erro ao salvar preço", description: code, variant: "destructive" })
      }
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "precos", id))
      setPrecos(precos.filter((p) => p.id !== id))
      setShowConfirm(null)
      toast({ title: "Preço removido com sucesso!" })
    } catch (error: any) {
      const code = error?.code || "unknown"
      if (code === "permission-denied") {
        toast({ title: "Ação não permitida", description: "Você precisa de permissão de administrador para excluir preços.", variant: "destructive" })
      } else if (code === "unauthenticated") {
        toast({ title: "Sessão expirada", description: "Faça login novamente para continuar.", variant: "destructive" })
      } else {
        console.error('Erro ao excluir preço:', error)
        toast({ title: "Erro ao excluir preço", description: code, variant: "destructive" })
      }
    }
  }

  // Filtros e ordenação
  const filteredPrecos = precos
    .filter(preco => {
      const matchesSearch = preco.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === "todos" || preco.tipo === filterType
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aValue = sortBy === "tipo" ? a.tipo : a.valor
      const bValue = sortBy === "tipo" ? b.tipo : b.valor
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sortOrder === "asc" ? comparison : -comparison
    })

  const toggleSort = (field: "tipo" | "valor") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Gerenciar Preços
          </h1>
          <p className="text-gray-600">
            Cadastre e gerencie os preços dos combustíveis
          </p>
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Preço
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {tiposCombustivel.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center justify-center">
              {filteredPrecos.length} de {precos.length} preços
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Preços */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Carregando preços...</p>
          </div>
        </div>
      ) : filteredPrecos.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum preço encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== "todos" 
                ? "Tente ajustar os filtros de busca"
                : "Comece adicionando o primeiro preço"
              }
            </p>
            {!searchTerm && filterType === "todos" && (
              <Button onClick={openAddModal}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Preço
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSort("tipo")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Tipo de Combustível</span>
                          {sortBy === "tipo" && (
                            sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSort("valor")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Valor (R$)</span>
                          {sortBy === "valor" && (
                            sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-700">Criado por</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPrecos.map((preco) => (
                      <tr key={preco.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-900">{preco.tipo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-green-600">
                            R$ {preco.valor.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {preco.createdByEmail || preco.createdBy || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(preco)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir Preço</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o preço de <strong>{preco.tipo}</strong>?
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(preco.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredPrecos.map((preco) => (
              <Card key={preco.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{preco.tipo}</h3>
                        <p className="text-lg font-bold text-green-600">
                          R$ {preco.valor.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(preco)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Preço</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o preço de <strong>{preco.tipo}</strong>?
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(preco.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Adicionar/Editar */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar Preço" : "Adicionar Novo Preço"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Combustível</Label>
              <Select value={form.tipo} onValueChange={(value) => setForm(f => ({ ...f, tipo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposCombustivel.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={form.valor}
                onChange={(e) => setForm(f => ({ ...f, valor: e.target.value }))}
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {saving ? "Salvando..." : (editando ? "Atualizar" : "Adicionar")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 