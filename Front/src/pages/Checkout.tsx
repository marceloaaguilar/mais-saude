import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Star, CreditCard, User, Mail, Phone, MapPin, Loader2, QrCode, FileText, Banknote } from "lucide-react";
import { apiService, type HealthPlan, type Customer, type PaymentMethod, type AsaasChargeResponse } from "@/services/api";

const Checkout = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  
  const [plan, setPlan] = useState<HealthPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<AsaasChargeResponse | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<Array<{
    id: string;
    name: string;
    description: string;
    available: boolean;
  }>>([]);
  
  // Estados do formulário
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BOLETO');
  const [customerData, setCustomerData] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    cpfCnpj: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: ''
  });

  // Estados para cartão de crédito
  const [creditCardData, setCreditCardData] = useState({
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
    installments: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca o plano e métodos de pagamento em paralelo
        const [planResponse, methodsResponse] = await Promise.all([
          apiService.getPlans(),
          apiService.getPaymentMethods()
        ]);

        // Configura o plano
        const selectedPlan = planResponse.data.plans.find((p: HealthPlan) => p.id === planId);
        if (selectedPlan) {
          setPlan(selectedPlan);
        } else {
          setError("Plano não encontrado");
        }

        // Configura os métodos de pagamento
        if (methodsResponse.data) {
          setPaymentMethods(methodsResponse.data);
          
          // Define o método de pagamento padrão baseado na disponibilidade
          const availableMethods = methodsResponse.data.filter(method => method.available);
          if (availableMethods.length > 0) {
            // Prioriza PIX se disponível, senão Boleto, senão Cartão
            const pixMethod = availableMethods.find(m => m.id === 'pix');
            const boletoMethod = availableMethods.find(m => m.id === 'boleto');
            const cardMethod = availableMethods.find(m => m.id === 'credit_card');
            
            if (pixMethod) {
              setPaymentMethod('PIX');
            } else if (boletoMethod) {
              setPaymentMethod('BOLETO');
            } else if (cardMethod) {
              setPaymentMethod('CREDIT_CARD');
            }
          }
        }
      } catch (err) {
        setError("Erro ao carregar dados");
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchData();
    }
  }, [planId]);

  const handleInputChange = (field: keyof Customer, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreditCardChange = (field: string, value: string) => {
    setCreditCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const validateForm = (): boolean => {
    if (!customerData.name || !customerData.email || !customerData.phone || 
        !customerData.cpfCnpj || !customerData.postalCode || !customerData.address || 
        !customerData.addressNumber || !customerData.city || !customerData.state) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return false;
    }

    if (paymentMethod === 'CREDIT_CARD') {
      if (!creditCardData.holderName || !creditCardData.number || 
          !creditCardData.expiryMonth || !creditCardData.expiryYear || !creditCardData.ccv) {
        setError("Por favor, preencha todos os dados do cartão de crédito");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plan || !validateForm()) return;

    setProcessing(true);
    setError(null);

    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7); // 7 dias para vencimento

      const chargeData = {
        customer: {
          ...customerData,
          cpfCnpj: customerData.cpfCnpj.replace(/\D/g, ''),
          phone: customerData.phone.replace(/\D/g, ''),
          postalCode: customerData.postalCode.replace(/\D/g, '')
        },
        value: plan.monthlyPrice,
        dueDate: dueDate.toISOString().split('T')[0],
        description: `Plano ${plan.name} - ${plan.description}`,
        externalReference: `plan_${plan.id}_${Date.now()}`,
        ...(paymentMethod === 'CREDIT_CARD' && {
          installmentCount: 1, // Sem parcelamento - cobrança recorrente
          installmentValue: plan ? Number(plan.monthlyPrice.toFixed(2)) : 0,
          creditCard: {
            holderName: creditCardData.holderName,
            number: creditCardData.number.replace(/\s/g, ''),
            expiryMonth: creditCardData.expiryMonth,
            expiryYear: creditCardData.expiryYear,
            ccv: creditCardData.ccv
          },
          creditCardHolderInfo: {
            name: customerData.name,
            email: customerData.email,
            cpfCnpj: customerData.cpfCnpj.replace(/\D/g, ''),
            postalCode: customerData.postalCode.replace(/\D/g, ''),
            addressNumber: customerData.addressNumber,
            addressComplement: customerData.complement,
            phone: customerData.phone.replace(/\D/g, ''),
          }
        })
      };

      let response: any;
      
      // Usa o endpoint de pagamento recorrente para todos os métodos de pagamento
      // Isso garante que as cobranças sejam registradas como assinaturas no Asaas
      const recurringChargeData = {
        ...chargeData,
        billingType: paymentMethod,
        subscription: true
      };
      response = await apiService.createRecurringPayment(recurringChargeData);

      if (response.success) {
        setPaymentResult(response.data);
      } else {
        setError(response.message || 'Erro ao processar pagamento');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento');
      console.error('Erro no pagamento:', err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => navigate('/')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de resultado do pagamento
  if (paymentResult) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Pagamento Criado com Sucesso!</CardTitle>
              <CardDescription>
                Seu pagamento foi processado. Siga as instruções abaixo para finalizar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Detalhes do Pagamento</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ID do Pagamento:</span>
                    <span className="font-mono">{paymentResult.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span>R$ {paymentResult.value.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="capitalize">{paymentResult.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vencimento:</span>
                    <span>{new Date(paymentResult.dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Instruções específicas por método de pagamento */}
              {paymentMethod === 'PIX' && paymentResult.pixTransaction && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <QrCode className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Pagamento via PIX</h3>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">
                    Escaneie o QR Code ou copie o código PIX para realizar o pagamento:
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <img 
                      src={`data:image/png;base64,${paymentResult.pixTransaction.encodedImage}`}
                      alt="QR Code PIX"
                      className="mx-auto mb-3"
                    />
                    <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                      {paymentResult.pixTransaction.payload}
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Válido até: {new Date(paymentResult.pixTransaction.expirationDate).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}

              {paymentMethod === 'BOLETO' && paymentResult.bankSlipUrl && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FileText className="w-5 h-5 mr-2 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Boleto Bancário</h3>
                  </div>
                  <p className="text-sm text-orange-800 mb-3">
                    Clique no botão abaixo para visualizar e imprimir seu boleto:
                  </p>
                  <Button asChild className="w-full">
                    <a href={paymentResult.bankSlipUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Visualizar Boleto
                    </a>
                  </Button>
                </div>
              )}

              {paymentMethod === 'CREDIT_CARD' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="font-semibold text-green-900">Cartão de Crédito</h3>
                  </div>
                  <p className="text-sm text-green-800">
                    {paymentResult.status === 'CONFIRMED' 
                      ? 'Pagamento aprovado! Seu plano já está ativo.'
                      : 'Pagamento em processamento. Você receberá uma confirmação em breve.'
                    }
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao início
                </Button>
                {paymentResult.invoiceUrl && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={paymentResult.invoiceUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Fatura
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Finalizar Contratação</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={customerData.cpfCnpj}
                        onChange={(e) => handleInputChange('cpfCnpj', formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Endereço */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={customerData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', formatCEP(e.target.value))}
                        placeholder="00000-000"
                        maxLength={9}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={customerData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Rua, Avenida, etc."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={customerData.addressNumber}
                        onChange={(e) => handleInputChange('addressNumber', e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={customerData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={customerData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Sua cidade"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={customerData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="SP"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="province">Bairro *</Label>
                    <Input
                      id="province"
                      value={customerData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      placeholder="Seu bairro"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Método de Pagamento
                  </CardTitle>
                  <CardDescription>
                    Cobranças serão realizadas de forma recorrente mensalmente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    {paymentMethods.map((method) => {
                      const getMethodIcon = (id: string) => {
                        switch (id) {
                          case 'pix':
                            return <QrCode className="w-5 h-5 mr-2 text-blue-600" />;
                          case 'boleto':
                            return <FileText className="w-5 h-5 mr-2 text-orange-600" />;
                          case 'credit_card':
                            return <CreditCard className="w-5 h-5 mr-2 text-green-600" />;
                          default:
                            return <Banknote className="w-5 h-5 mr-2 text-gray-600" />;
                        }
                      };

                      const getMethodValue = (id: string): PaymentMethod => {
                        switch (id) {
                          case 'pix':
                            return 'PIX';
                          case 'boleto':
                            return 'BOLETO';
                          case 'credit_card':
                            return 'CREDIT_CARD';
                          default:
                            return 'BOLETO';
                        }
                      };

                      return (
                        <div 
                          key={method.id} 
                          className={`flex items-center space-x-2 p-3 border rounded-lg ${
                            !method.available ? 'opacity-50 bg-gray-50' : ''
                          }`}
                        >
                          <RadioGroupItem 
                            value={getMethodValue(method.id)} 
                            id={method.id} 
                            disabled={!method.available}
                          />
                          <Label 
                            htmlFor={method.id} 
                            className={`flex items-center flex-1 ${
                              method.available ? 'cursor-pointer' : 'cursor-not-allowed'
                            }`}
                          >
                            {getMethodIcon(method.id)}
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {method.available ? method.description : 'Temporariamente indisponível'}
                              </div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Dados do Cartão de Crédito */}
                  {paymentMethod === 'CREDIT_CARD' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="cardHolder">Nome no Cartão *</Label>
                        <Input
                          id="cardHolder"
                          value={creditCardData.holderName}
                          onChange={(e) => handleCreditCardChange('holderName', e.target.value)}
                          placeholder="Nome como está no cartão"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          value={creditCardData.number}
                          onChange={(e) => handleCreditCardChange('number', e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryMonth">Mês *</Label>
                          <Select value={creditCardData.expiryMonth} onValueChange={(value) => handleCreditCardChange('expiryMonth', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Mês" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                  {String(i + 1).padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="expiryYear">Ano *</Label>
                          <Select value={creditCardData.expiryYear} onValueChange={(value) => handleCreditCardChange('expiryYear', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Ano" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() + i;
                                return (
                                  <SelectItem key={year} value={String(year)}>
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="ccv">CCV *</Label>
                          <Input
                            id="ccv"
                            value={creditCardData.ccv}
                            onChange={(e) => handleCreditCardChange('ccv', e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                      {/* Parcelamento removido - cobranças serão recorrentes */}
                    </div>
                  )}
                </CardContent>
              </Card>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={processing}>
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Finalizar Contratação
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Resumo do Plano */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan && (
                  <>
                    <div className="flex items-start space-x-3">
                      {plan.popular && (
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Benefícios inclusos:</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Plano {plan.name}</span>
                        <span>R$ {plan.monthlyPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>R$ {plan.monthlyPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cobrança mensal • Cancele quando quiser
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;