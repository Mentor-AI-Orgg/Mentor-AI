const DEFAULT_SUBSCRIPTIONS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '14.99 lei/lună',
    description: 'Acces de bază la Mentor AI și notificări offline.',
    features: ['Chat Mentor AI', 'Planuri de studiu esențiale', 'Fallback offline pentru abonamente']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '39.99 lei/lună',
    description: 'Conversații nelimitate și curriculum complet cu asistență în timp real.',
    features: ['Support prioritar', 'Analize de progres', 'Resurse offline extinse']
  },
  {
    id: 'academic',
    name: 'Academic',
    price: '69.99 lei/lună',
    description: 'Pachet complet pentru BAC, simulări și resurse personalizate.',
    features: ['Simulare examen BAC', 'Curriculum complet', 'Offline fallback + date locale']
  }
];

const fetchWithTimeout = async (url, options = {}, timeout = 6000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { signal: controller.signal, ...options });
  clearTimeout(timer);
  return response;
};

const safeFetchJson = async (url, options) => {
  const response = await fetchWithTimeout(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const MentorAPI = {
  async chat(payload) {
    try {
      const data = await safeFetchJson('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return {
        success: false,
        fallback: true,
        data: {
          response: 'Momentan nu pot contacta backend-ul. Încearcă din nou în câteva secunde.'
        }
      };
    }
  },

  async detect(payload) {
    try {
      const data = await safeFetchJson('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return {
        success: false,
        fallback: true,
        data: { verdict: 'Service indisponibil', ai_probability: 0 }
      };
    }
  },

  async getSubscriptions() {
    try {
      const data = await safeFetchJson('/api/subscriptions');
      return { success: true, data: data.subscriptions || data, fallback: false };
    } catch (error) {
      return { success: false, data: DEFAULT_SUBSCRIPTIONS, fallback: true };
    }
  },

  async health() {
    try {
      const data = await safeFetchJson('/api/health');
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  }
};

window.MentorAPI = MentorAPI;
