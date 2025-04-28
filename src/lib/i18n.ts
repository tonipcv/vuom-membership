export interface Translations {
  choosePlan: string;
  startJourney: string;
  logout: string;
  features: {
    allExercises: string;
    exclusiveGroup: string;
    chatSupport: string;
    guarantee: string;
    allBasicPlan: string;
    exclusiveContent: string;
    prioritySupport: string;
    individualMentoring: string;
    extendedGuarantee: string;
  };
  plans: {
    starter: string;
    pro: string;
    perDay: string;
    perMonth: string;
    popular: string;
    basic: string;
    month: string;
    mostPopular: string;
    startNow: string;
  };
  login: {
    title: string;
    description: string;
    button: string;
    welcomeBack: string;
    signInContinue: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
    forgotPassword: string;
    noAccount: string;
    createAccount: string;
  };
  register: {
    title: string;
    description: string;
    startJourney: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    signUp: string;
    signingUp: string;
    alreadyHaveAccount: string;
    signIn: string;
    createAccount: string;
    errors: {
      requiredFields: string;
      invalidEmail: string;
      weakPassword: string;
      passwordsDoNotMatch: string;
      emailInUse: string;
    };
  };
  errors: {
    payment: string;
    stripe: string;
    generic: string;
  };
  trial: {
    congratulations: string;
    description: string;
    chooseValue: string;
    oneTime: string;
    processing: string;
    activateButton: string;
    info1: string;
    info2: string;
    info3: string;
  };
}

export const translations: Record<string, Translations> = {
  'pt-BR': {
    choosePlan: 'Escolha o plano ideal para você',
    startJourney: 'Comece sua jornada',
    logout: 'Sair',
    features: {
      allExercises: 'Acesso a todos os exercícios',
      exclusiveGroup: 'Acesso ao grupo exclusivo',
      chatSupport: 'Suporte via chat',
      guarantee: 'Garantia de 7 dias',
      allBasicPlan: 'Tudo do plano Iniciante',
      exclusiveContent: 'Acesso a conteúdos exclusivos',
      prioritySupport: 'Suporte prioritário',
      individualMentoring: 'Mentoria individual',
      extendedGuarantee: 'Garantia estendida de 15 dias',
    },
    plans: {
      starter: 'Plano Iniciante',
      pro: 'Plano Pro',
      basic: 'Plano Básico',
      perDay: 'por dia',
      perMonth: 'por mês',
      month: 'mês',
      popular: 'Mais popular',
      mostPopular: 'Mais popular',
      startNow: 'Começar agora',
    },
    login: {
      title: 'Entre para começar',
      description: 'Faça login para acessar sua conta',
      button: 'Entrar com Google',
      welcomeBack: 'Bem-vindo de volta!',
      signInContinue: 'Entre para continuar',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      password: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      signIn: 'Entrar',
      signingIn: 'Entrando...',
      forgotPassword: 'Esqueceu sua senha?',
      noAccount: 'Ainda não tem uma conta?',
      createAccount: 'Criar conta',
    },
    register: {
      title: 'Crie sua conta',
      description: 'Preencha os dados abaixo para criar sua conta',
      startJourney: 'Comece sua jornada conosco',
      name: 'Nome',
      namePlaceholder: 'Digite seu nome',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      password: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      confirmPassword: 'Confirme sua senha',
      confirmPasswordPlaceholder: 'Digite sua senha novamente',
      signUp: 'Criar conta',
      signingUp: 'Criando conta...',
      alreadyHaveAccount: 'Já tem uma conta?',
      signIn: 'Entrar',
      createAccount: 'Criar conta',
      errors: {
        requiredFields: 'Todos os campos são obrigatórios',
        invalidEmail: 'E-mail inválido',
        weakPassword: 'A senha deve ter pelo menos 6 caracteres',
        passwordsDoNotMatch: 'As senhas não conferem',
        emailInUse: 'Este e-mail já está em uso',
      },
    },
    errors: {
      payment: 'Erro ao criar sessão de pagamento',
      stripe: 'Erro ao carregar o Stripe',
      generic: 'Erro ao processar pagamento',
    },
    trial: {
      congratulations: 'Parabéns! 🎉',
      description: 'Liberamos para você 14 dias de teste do VUOM Pro com uma pequena taxa de ativação da sua preferência.',
      chooseValue: 'Isso é só para mantermos os nossos profissionais, escolha um valor para contribuição:',
      oneTime: 'taxa única',
      processing: 'Processando...',
      activateButton: 'Ativar Período de 14 dias Teste',
      info1: 'Você paga apenas a taxa de ativação agora e tem 14 dias para testar participar do VUOM Pro.',
      info2: 'Após o período de teste, caso queira continuar com o plano Pro, será cobrado 197/mês para continuar com o plano Pro e você poderá cancelar a qualquer momento.',
      info3: 'Você pode cancelar a qualquer momento antes do fim do período de teste.',
    },
  },
  'en': {
    choosePlan: 'Choose the ideal plan for you',
    startJourney: 'Start your journey',
    logout: 'Logout',
    features: {
      allExercises: 'Access to all exercises',
      exclusiveGroup: 'Access to exclusive group',
      chatSupport: 'Chat support',
      guarantee: '7-day guarantee',
      allBasicPlan: 'Everything in Basic plan',
      exclusiveContent: 'Access to exclusive content',
      prioritySupport: 'Priority support',
      individualMentoring: 'Individual mentoring',
      extendedGuarantee: '15-day extended guarantee',
    },
    plans: {
      starter: 'Starter Plan',
      pro: 'Pro Plan',
      basic: 'Basic Plan',
      perDay: 'per day',
      perMonth: 'per month',
      month: 'month',
      popular: 'Most popular',
      mostPopular: 'Most popular',
      startNow: 'Start now',
    },
    login: {
      title: 'Sign in to start',
      description: 'Login to access your account',
      button: 'Sign in with Google',
      welcomeBack: 'Welcome back!',
      signInContinue: 'Sign in to continue',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      createAccount: 'Create account',
    },
    register: {
      title: 'Create your account',
      description: 'Fill in the details below to create your account',
      startJourney: 'Start your journey with us',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Enter your password again',
      signUp: 'Sign up',
      signingUp: 'Signing up...',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      createAccount: 'Create account',
      errors: {
        requiredFields: 'All fields are required',
        invalidEmail: 'Invalid email',
        weakPassword: 'Password must be at least 6 characters',
        passwordsDoNotMatch: 'Passwords do not match',
        emailInUse: 'This email is already in use',
      },
    },
    errors: {
      payment: 'Error creating payment session',
      stripe: 'Error loading Stripe',
      generic: 'Error processing payment',
    },
    trial: {
      congratulations: 'Congratulations! 🎉',
      description: 'We have unlocked a 14-day trial of VUOM Pro for you with a small activation fee of your choice.',
      chooseValue: 'This is just to support our professionals, choose a contribution amount:',
      oneTime: 'one-time fee',
      processing: 'Processing...',
      activateButton: 'Activate 14-day Trial Period',
      info1: 'You only pay the activation fee now and get 14 days to try VUOM Pro.',
      info2: 'After the trial period, if you want to continue with the Pro plan, you will be charged 197/month to continue with the Pro plan and you can cancel at any time.',
      info3: 'You can cancel at any time before the end of the trial period.',
    },
  },
  'es': {
    choosePlan: 'Elige el plan ideal para ti',
    startJourney: 'Comienza tu viaje',
    logout: 'Cerrar sesión',
    features: {
      allExercises: 'Acceso a todos los ejercicios',
      exclusiveGroup: 'Acceso al grupo exclusivo',
      chatSupport: 'Soporte por chat',
      guarantee: 'Garantía de 7 días',
      allBasicPlan: 'Todo del plan Básico',
      exclusiveContent: 'Acceso a contenido exclusivo',
      prioritySupport: 'Soporte prioritario',
      individualMentoring: 'Mentoría individual',
      extendedGuarantee: 'Garantía extendida de 15 días',
    },
    plans: {
      starter: 'Plan Inicial',
      pro: 'Plan Pro',
      basic: 'Plan Básico',
      perDay: 'por día',
      perMonth: 'por mes',
      month: 'mes',
      popular: 'Más popular',
      mostPopular: 'Más popular',
      startNow: 'Empezar ahora',
    },
    login: {
      title: 'Inicia sesión para comenzar',
      description: 'Inicia sesión para acceder a tu cuenta',
      button: 'Iniciar sesión con Google',
      welcomeBack: '¡Bienvenido de nuevo!',
      signInContinue: 'Inicia sesión para continuar',
      email: 'Correo electrónico',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      password: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      signIn: 'Iniciar sesión',
      signingIn: 'Iniciando sesión...',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      createAccount: 'Crear cuenta',
    },
    register: {
      title: 'Crea tu cuenta',
      description: 'Completa los datos a continuación para crear tu cuenta',
      startJourney: 'Comienza tu viaje con nosotros',
      name: 'Nombre',
      namePlaceholder: 'Ingresa tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      password: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      confirmPassword: 'Confirmar contraseña',
      confirmPasswordPlaceholder: 'Ingresa tu contraseña nuevamente',
      signUp: 'Registrarse',
      signingUp: 'Registrando...',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar sesión',
      createAccount: 'Crear cuenta',
      errors: {
        requiredFields: 'Todos los campos son obligatorios',
        invalidEmail: 'Correo electrónico inválido',
        weakPassword: 'La contraseña debe tener al menos 6 caracteres',
        passwordsDoNotMatch: 'Las contraseñas no coinciden',
        emailInUse: 'Este correo electrónico ya está en uso',
      },
    },
    errors: {
      payment: 'Error al crear la sesión de pago',
      stripe: 'Error al cargar Stripe',
      generic: 'Error al procesar el pago',
    },
    trial: {
      congratulations: '¡Felicitaciones! 🎉',
      description: 'Te hemos desbloqueado una prueba de 14 días de VUOM Pro con una pequeña cuota de activación de tu elección.',
      chooseValue: 'Esto es solo para mantener a nuestros profesionales, elige un monto de contribución:',
      oneTime: 'cuota única',
      processing: 'Procesando...',
      activateButton: 'Activar Período de Prueba de 14 días',
      info1: 'Solo pagas la cuota de activación ahora y tienes 14 días para probar VUOM Pro.',
      info2: 'Después del período de prueba, si deseas continuar con el plan Pro, se te cobrará 197/mes para continuar con el plan Pro y puedes cancelar en cualquier momento.',
      info3: 'Puedes cancelar en cualquier momento antes del final del período de prueba.',
    },
  },
}; 