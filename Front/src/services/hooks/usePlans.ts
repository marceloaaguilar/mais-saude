import { useState, useEffect } from 'react';
import { apiService, HealthPlan } from '../api';

/**
 * Hook personalizado para gerenciar planos de saúde
 */
export const usePlans = () => {
  const [plans, setPlans] = useState<HealthPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca todos os planos da API
   */
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getPlans();
      
      if (response.success && response.data) {
        setPlans(response.data.plans);
      } else {
        throw new Error(response.message || 'Erro ao buscar planos');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao buscar planos:', err);
      
      // Fallback para dados estáticos em caso de erro
      setPlans([
        {
          id: 'plan-basic',
          name: 'Básico',
          price: 'R$ 89',
          period: '/mês',
          description: 'Ideal para solteiros e casais jovens',
          features: [
            'Consultas médicas ilimitadas',
            'Telemedicina 24/7',
            'Exames básicos inclusos',
            'Suporte por WhatsApp',
            'Desconto em medicamentos'
          ],
          popular: false,
          category: 'basic',
          maxPeople: 2,
          monthlyPrice: 89
        },
        {
          id: 'plan-family',
          name: 'Família',
          price: 'R$ 179',
          period: '/mês',
          description: 'Perfeito para famílias de até 4 pessoas',
          features: [
            'Tudo do plano Básico',
            'Cobertura para 4 pessoas',
            'Pediatria especializada',
            'Exames avançados inclusos',
            'Consultas domiciliares',
            'Programa de vacinação'
          ],
          popular: true,
          category: 'family',
          maxPeople: 4,
          monthlyPrice: 179
        },
        {
          id: 'plan-premium',
          name: 'Premium',
          price: 'R$ 299',
          period: '/mês',
          description: 'Cobertura completa para toda família',
          features: [
            'Tudo do plano Família',
            'Cobertura ilimitada',
            'Especialistas premium',
            'Cirurgias incluídas',
            'Check-up anual gratuito',
            'Concierge médico 24/7'
          ],
          popular: false,
          category: 'premium',
          maxPeople: 999,
          monthlyPrice: 299
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca um plano específico por ID
   */
  const getPlanById = async (id: string): Promise<HealthPlan | null> => {
    try {
      const response = await apiService.getPlanById(id);
      
      if (response.success && response.data) {
        return response.data.plan;
      }
      
      return null;
    } catch (err) {
      console.error('Erro ao buscar plano por ID:', err);
      return null;
    }
  };

  /**
   * Recarrega os planos
   */
  const refetch = () => {
    fetchPlans();
  };

  // Busca os planos quando o hook é montado
  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refetch,
    getPlanById
  };
};