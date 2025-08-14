"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { db, auth } from "@/lib/firebase"
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar,
  Star,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight
} from "lucide-react"

interface Promocao {
  id: string
  titulo: string
  descricao: string
  ativo: boolean
  createdBy?: string | null
  createdByEmail?: string | null
}

export default function PromocoesAdmin() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editando, setEditando] = useState<Promocao | null>(null)
  const [showConfirm, setShowConfirm] = useState<{id: string, titulo: string} | null>(null)
  const [form, setForm] = useState({ titulo: "", descricao: "", ativo: true })
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"todos" | "ativo" | "inativo">("todos")
  const [sortBy, setSortBy] = useState<"titulo" | "descricao" | "ativo">("titulo")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchPromocoes()
  }, [])

  async function fetchPromocoes() {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, "promocoes"))
      const promocoesData: Promocao[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        promocoesData.push({ 
          id: doc.id, 
          titulo: data.titulo,
          descricao: data.descricao,
          ativo: data.ativo !== false // Padrão é true se não existir
        } as Promocao)
      })
      setPromocoes(promocoesData)
    } catch (error) {
      console.error('Erro ao carregar promoções:', error)
      toast({ title: "Erro ao carregar promoções", variant: "destructive" })
    }
    setLoading(false)
  }

  function openAddModal() {
    setEditando(null)
    setForm({ titulo: "", descricao: "", ativo: true })
    setShowModal(true)
  }

  function openEditModal(promo: Promocao) {
    setEditando(promo)
    setForm({ titulo: promo.titulo, descricao: promo.descricao, ativo: promo.ativo })
    setShowModal(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      if (editando) {
        await updateDoc(doc(db, "promocoes", editando.id), { 
          titulo: form.titulo, 
          descricao: form.descricao,
          ativo: form.ativo,
          updatedAt: new Date().toISOString(),
          updatedBy: auth.currentUser?.uid || null,
          updatedByEmail: auth.currentUser?.email || null
        })
        toast({ title: "Promoção atualizada com sucesso!" })
      } else {
        await addDoc(collection(db, "promocoes"), { 
          titulo: form.titulo, 
          descricao: form.descricao,
          ativo: form.ativo,
          createdAt: new Date().toISOString(),
          createdBy: auth.currentUser?.uid || null,
          createdByEmail: auth.currentUser?.email || null
        })
        toast({ title: "Promoção adicionada com sucesso!" })
      }
      setShowModal(false)
      fetchPromocoes()
    } catch (error: any) {
      const code = error?.code || "unknown"
      if (code === "permission-denied") {
        toast({ title: "Ação não permitida", description: "Você precisa de permissão de administrador para alterar promoções.", variant: "destructive" })
      } else if (code === "unauthenticated") {
        toast({ title: "Sessão expirada", description: "Faça login novamente para continuar.", variant: "destructive" })
      } else {
        console.error('Erro ao salvar promoção:', error)
        toast({ title: "Erro ao salvar promoção", description: code, variant: "destructive" })
      }
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "promocoes", id))
      setPromocoes(promocoes.filter((p) => p.id !== id))
      setShowConfirm(null)
      toast({ title: "Promoção removida com sucesso!" })
    } catch (error: any) {
      const code = error?.code || "unknown"
      if (code === "permission-denied") {
        toast({ title: "Ação não permitida", description: "Você precisa de permissão de administrador para excluir promoções.", variant: "destructive" })
      } else if (code === "unauthenticated") {
        toast({ title: "Sessão expirada", description: "Faça login novamente para continuar.", variant: "destructive" })
      } else {
        console.error('Erro ao excluir promoção:', error)
        toast({ title: "Erro ao excluir promoção", description: code, variant: "destructive" })
      }
    }
  }

  async function toggleStatus(id: string, currentStatus: boolean) {
    try {
      await updateDoc(doc(db, "promocoes", id), { 
        ativo: !currentStatus,
        updatedAt: new Date().toISOString()
      })
      
      setPromocoes(promocoes.map(promo => 
        promo.id === id ? { ...promo, ativo: !currentStatus } : promo
      ))
      
      toast({ 
        title: currentStatus ? "Promoção desativada!" : "Promoção ativada!",
        description: currentStatus ? "A promoção não será exibida no site" : "A promoção será exibida no site"
      })
    } catch (error) {
      console.error('Erro ao alterar status da promoção:', error)
      toast({ title: "Erro ao alterar status", variant: "destructive" })
    }
  }

  // Filtros e ordenação
  const filteredPromocoes = promocoes
    .filter(promo => {
      const matchesSearch = promo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          promo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "todos" || 
                          (filterStatus === "ativo" && promo.ativo) ||
                          (filterStatus === "inativo" && !promo.ativo)
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: string | boolean
      let bValue: string | boolean
      
      if (sortBy === "titulo") {
        aValue = a.titulo
        bValue = b.titulo
      } else if (sortBy === "descricao") {
        aValue = a.descricao
        bValue = b.descricao
      } else {
        aValue = a.ativo
        bValue = b.ativo
      }
      
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sortOrder === "asc" ? comparison : -comparison
    })

  const toggleSort = (field: "titulo" | "descricao" | "ativo") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const stats = {
    total: promocoes.length,
    ativas: promocoes.filter(p => p.ativo).length,
    inativas: promocoes.filter(p => !p.ativo).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Gerenciar Promoções
          </h1>
          <p className="text-gray-600">
            Cadastre e gerencie as promoções do posto
          </p>
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Promoção
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ativas</p>
                <p className="text-2xl font-bold text-green-600">{stats.ativas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeOff className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inativas</p>
                <p className="text-2xl font-bold text-gray-600">{stats.inativas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar promoções..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-filter" className="text-sm font-medium">Status:</Label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "todos" | "ativo" | "inativo")}
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              >
                <option value="todos">Todas</option>
                <option value="ativo">Ativas</option>
                <option value="inativo">Inativas</option>
              </select>
            </div>
            <div className="text-sm text-gray-500 flex items-center justify-center">
              {filteredPromocoes.length} de {promocoes.length} promoções
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Promoções */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Carregando promoções...</p>
          </div>
        </div>
      ) : filteredPromocoes.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma promoção encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "todos"
                ? "Tente ajustar os filtros de busca"
                : "Comece adicionando a primeira promoção"
              }
            </p>
            {!searchTerm && filterStatus === "todos" && (
              <Button onClick={openAddModal}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Promoção
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
                        onClick={() => toggleSort("titulo")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Título</span>
                          {sortBy === "titulo" && (
                            sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSort("descricao")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Descrição</span>
                          {sortBy === "descricao" && (
                            sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSort("ativo")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Status</span>
                          {sortBy === "ativo" && (
                            sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-700">Criado por</th>
                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPromocoes.map((promo) => (
                      <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              promo.ativo ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <Tag className={`h-4 w-4 ${
                                promo.ativo ? 'text-blue-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <div>
                              <span className={`font-medium ${
                                promo.ativo ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {promo.titulo}
                              </span>
                              {!promo.ativo && (
                                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  Inativa
                                </span>
                              )}
                            </div>
                          </div>
                         </td>
                        <td className="px-6 py-4">
                          <span className={`max-w-xs truncate block ${
                            promo.ativo ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {promo.descricao}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {promo.createdByEmail || promo.createdBy || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={promo.ativo}
                              onCheckedChange={() => toggleStatus(promo.id, promo.ativo)}
                              className="data-[state=checked]:bg-green-600"
                            />
                            <span className={`text-sm font-medium ${
                              promo.ativo ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {promo.ativo ? 'Ativa' : 'Inativa'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(promo)}
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
                                  <AlertDialogTitle>Excluir Promoção</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir a promoção <strong>{promo.titulo}</strong>?
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(promo.id)}
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
            {filteredPromocoes.map((promo) => (
              <Card key={promo.id} className={`border-0 shadow-sm ${
                !promo.ativo ? 'opacity-75' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        promo.ativo ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Tag className={`h-5 w-5 ${
                          promo.ativo ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${
                            promo.ativo ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {promo.titulo}
                          </h3>
                          {!promo.ativo && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Inativa
                            </span>
                          )}
                        </div>
                        <p className={`text-sm overflow-hidden text-ellipsis ${
                          promo.ativo ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {promo.descricao}
                        </p>
                        <div className="flex items-center space-x-3 mt-3">
                          <Switch
                            checked={promo.ativo}
                            onCheckedChange={() => toggleStatus(promo.id, promo.ativo)}
                            className="data-[state=checked]:bg-green-600"
                          />
                          <span className={`text-sm font-medium ${
                            promo.ativo ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {promo.ativo ? 'Ativa' : 'Inativa'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(promo)}
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
                            <AlertDialogTitle>Excluir Promoção</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a promoção <strong>{promo.titulo}</strong>?
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(promo.id)}
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
              {editando ? "Editar Promoção" : "Adicionar Nova Promoção"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Promoção</Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Ex: Desconto na Gasolina"
                value={form.titulo}
                onChange={(e) => setForm(f => ({ ...f, titulo: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva os detalhes da promoção..."
                value={form.descricao}
                onChange={(e) => setForm(f => ({ ...f, descricao: e.target.value }))}
                rows={4}
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="ativo"
                checked={form.ativo}
                onCheckedChange={(checked) => setForm(f => ({ ...f, ativo: checked }))}
                className="data-[state=checked]:bg-green-600"
              />
              <Label htmlFor="ativo" className="text-sm font-medium">
                Promoção ativa
              </Label>
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