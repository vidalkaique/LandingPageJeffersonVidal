import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, ArrowLeft } from 'lucide-react';

interface PaymentLinks {
  cartao: string;
  pix: string;
}

interface PlanData {
  name: string;
  description: string;
  links: PaymentLinks;
}

const paymentPlans: Record<string, PlanData> = {
  'mensal': {
    name: 'Plano Mensal',
    description: 'Consultoria Online - 1 mês',
    links: {
      cartao: 'https://buy.stripe.com/test_fZu7sM05ceHi2o1fWM3ks05',
      pix: 'https://nubank.com.br/cobrar/7curz/68ece10d-bd03-4175-9a8b-6a1c07649339'
    }
  },
  'bimestral': {
    name: 'Plano Bimestral',
    description: 'Consultoria Online - 2 meses',
    links: {
      cartao: 'https://buy.stripe.com/test_00w5kEaJQ7eQ3s5dOE3ks06',
      pix: 'https://nubank.com.br/cobrar/7curz/68ece159-89d2-4371-914b-3854fa0b6b3a'
    }
  },
  'trimestral': {
    name: 'Plano Trimestral',
    description: 'Consultoria Online - 3 meses',
    links: {
      cartao: 'https://buy.stripe.com/test_aFadRag4aar22o19yo3ks07',
      pix: 'https://nubank.com.br/cobrar/7curz/68ece188-ee59-4415-b0d3-55f1449aa750'
    }
  },
  'presencial-3x': {
    name: 'Plano Presencial 3x',
    description: 'Personal Training - 3x por semana',
    links: {
      cartao: 'https://buy.stripe.com/test_dRmbJ2dW2fLmbYB8uk3ks02',
      pix: 'https://nubank.com.br/cobrar/7curz/68ece1c0-f72c-47ec-999e-16258edf613b'
    }
  },
  'presencial-5x': {
    name: 'Plano Presencial 5x',
    description: 'Personal Training - 5x por semana',
    links: {
      cartao: 'https://buy.stripe.com/test_00waEYbNUczad2FfWM3ks01',
      pix: 'https://nubank.com.br/cobrar/7curz/68ece1e4-3dee-4a4a-8988-d5a36ed083d8'
    }
  }
};

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [planKey, setPlanKey] = useState<string>('');

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan && paymentPlans[plan]) {
      setSelectedPlan(paymentPlans[plan]);
      setPlanKey(plan);
    } else {
      // Se não há plano válido, redireciona para home
      navigate('/');
    }
  }, [searchParams, navigate]);

  const handlePayment = (method: 'cartao' | 'pix') => {
    if (selectedPlan) {
      window.open(selectedPlan.links[method], '_blank');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={goBack}
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
          
          <div className="mb-6">
            <img 
              src="/img/logo_jeffersonvidal.png" 
              alt="Jefferson Vidal Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-2">
            Finalizar Pagamento
          </h1>
          
          <div className="bg-zinc-900 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-primary mb-1">
              {selectedPlan.name}
            </h2>
            <p className="text-gray-300 text-sm">
              {selectedPlan.description}
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white text-center mb-6">
            Escolha sua forma de pagamento:
          </h3>
          
          {/* PIX Button */}
          <Button
            onClick={() => handlePayment('pix')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg rounded-lg transition-all transform hover:scale-105"
            size="lg"
          >
            <QrCode className="w-6 h-6 mr-3" />
            Pagar com PIX
            <span className="ml-auto text-sm opacity-90">Aprovação instantânea</span>
          </Button>

          {/* Credit Card Button */}
          <Button
            onClick={() => handlePayment('cartao')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg transition-all transform hover:scale-105"
            size="lg"
          >
            <CreditCard className="w-6 h-6 mr-3" />
            Pagar com Cartão
            <span className="ml-auto text-sm opacity-90">Parcelamento disponível</span>
          </Button>
        </div>

        {/* Security Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            🔒 Pagamento 100% seguro e criptografado
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Processado por Stripe e Nubank
          </p>
        </div>
      </div>
    </div>
  );
}
