// SkillSwap - Core Application Logic & State Store
// Implements RF01-RF20 & UC01-UC14

// Local Storage Key
const STORAGE_KEY = 'skillswap_platform_state_v1';

// Default initial state
const defaultState = {
  currentUser: {
    id: 'user-1',
    name: 'Ana Silva',
    email: 'ana.silva@tech.com',
    password: '123456',
    role: 'USER', // 'USER' | 'ADMIN'
    xp: 380,
    level: 3,
    streakDays: 6,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Desenvolvedora Front-end Senior com 6 anos de experiência. Adoro ensinar React/TypeScript e tenho muita vontade de dominar UI/UX e Figma.',
    location: 'São Paulo, SP',
    availability: ['noite', 'finais_de_semana'],
    phone: '(11) 98765-4321',
    linkedin: 'linkedin.com/in/anasilva-dev',
    github: 'github.com/anasilva',
    rating: 4.9,
    reviewsCount: 14
  },
  
  users: [
    {
      id: 'user-1',
      name: 'Ana Silva',
      email: 'ana.silva@tech.com',
      password: '123456',
      role: 'USER',
      xp: 380,
      level: 3,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      bio: 'Desenvolvedora Front-end com paixão por interfaces acessíveis e código limpo.',
      location: 'São Paulo, SP',
      availability: ['noite', 'finais_de_semana'],
      rating: 4.9,
      reviewsCount: 14,
      skillsTeaching: [
        { id: 'sk-1', name: 'React.js & Hooks', proficiency: 'EXPERT', category: 'Tecnologia' },
        { id: 'sk-2', name: 'TypeScript Avançado', proficiency: 'ADVANCED', category: 'Tecnologia' },
        { id: 'sk-3', name: 'Next.js 14 App Router', proficiency: 'INTERMEDIATE', category: 'Tecnologia' }
      ],
      skillsLearning: [
        { id: 'sk-4', name: 'Figma & Design Systems', targetGoal: 'Criar protótipos de alta fidelidade e tokens', category: 'Design' },
        { id: 'sk-5', name: 'Inglês para Entrevistas Tech', targetGoal: 'Fluência em conversação profissional', category: 'Idiomas' }
      ]
    },
    {
      id: 'user-2',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@design.com',
      password: '123456',
      role: 'USER',
      xp: 520,
      level: 4,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Lead Product Designer em Fintech. Especialista em Design System, Auto-Layout no Figma e Arquitetura de Informação.',
      location: 'São Paulo, SP',
      availability: ['noite', 'finais_de_semana'],
      rating: 5.0,
      reviewsCount: 22,
      skillsTeaching: [
        { id: 'sk-6', name: 'Figma & Design Systems', proficiency: 'EXPERT', category: 'Design' },
        { id: 'sk-7', name: 'Pesquisa com Usuários (UX Research)', proficiency: 'ADVANCED', category: 'Design' }
      ],
      skillsLearning: [
        { id: 'sk-1', name: 'React.js & Hooks', targetGoal: 'Construir meus próprios side-projects', category: 'Tecnologia' },
        { id: 'sk-8', name: 'Python para Automação', targetGoal: 'Scripts de produtividade', category: 'Tecnologia' }
      ]
    },
    {
      id: 'user-3',
      name: 'Beatriz Lima',
      email: 'beatriz.lima@lingua.com',
      password: '123456',
      role: 'USER',
      xp: 210,
      level: 2,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Professora de idiomas há 8 anos com vivência em Londres e Toronto. Foco em conversação prática sem enrolação.',
      location: 'Curitiba, PR',
      availability: ['manha', 'noite'],
      rating: 4.8,
      reviewsCount: 9,
      skillsTeaching: [
        { id: 'sk-5', name: 'Inglês para Entrevistas Tech', proficiency: 'EXPERT', category: 'Idiomas' },
        { id: 'sk-9', name: 'Espanhol Conversação', proficiency: 'ADVANCED', category: 'Idiomas' }
      ],
      skillsLearning: [
        { id: 'sk-10', name: 'Desenvolvimento Web Básico', targetGoal: 'Criar meu próprio site de aulas', category: 'Tecnologia' },
        { id: 'sk-11', name: 'Edição de Vídeo no CapCut/Premiere', targetGoal: 'Aulas para o YouTube', category: 'Áudio & Vídeo' }
      ]
    },
    {
      id: 'user-4',
      name: 'Gabriel Rocha',
      email: 'gabriel.rocha@data.com',
      password: '123456',
      role: 'USER',
      xp: 440,
      level: 3,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Cientista de Dados e Engenheiro Machine Learning. Ensino Python, Pandas e SQL para quem quer migrar para dados.',
      location: 'Rio de Janeiro, RJ',
      availability: ['noite'],
      rating: 4.9,
      reviewsCount: 16,
      skillsTeaching: [
        { id: 'sk-12', name: 'Python & Data Science', proficiency: 'EXPERT', category: 'Tecnologia' },
        { id: 'sk-13', name: 'SQL & Modelagem de Dados', proficiency: 'ADVANCED', category: 'Tecnologia' }
      ],
      skillsLearning: [
        { id: 'sk-1', name: 'React.js & Hooks', targetGoal: 'Construir dashboards interativos na web', category: 'Tecnologia' }
      ]
    },
    {
      id: 'user-admin',
      name: 'Rodrigo Moderador',
      email: 'admin@skillswap.com',
      password: '123456',
      role: 'ADMIN',
      xp: 990,
      level: 5,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Administrador do Ecossistema SkillSwap. Responsável por integridade, moderação de denúncias e homologação de certificados.',
      location: 'Florianópolis, SC',
      availability: ['manha', 'tarde', 'noite'],
      rating: 5.0,
      reviewsCount: 40,
      skillsTeaching: [],
      skillsLearning: []
    }
  ],

  // Exchanges (RF09, RF10)
  exchanges: [
    {
      id: 'exc-1',
      requesterId: 'user-2', // Carlos
      receiverId: 'user-1',  // Ana
      offeredSkill: 'Figma & Design Systems',
      desiredSkill: 'React.js & Hooks',
      proposalNote: 'Oi Ana! Vi que você quer aprender Figma e você domina React. Podemos fazer uma troca de 1h por semana! Eu te ensino componentes no Figma e você tira minhas dúvidas de TypeScript.',
      status: 'ACCEPTED', // PENDING, ACCEPTED, REJECTED, COMPLETED
      createdAt: '2026-10-20T14:30:00Z',
      acceptedAt: '2026-10-20T16:00:00Z',
      classesCount: 1
    },
    {
      id: 'exc-2',
      requesterId: 'user-3', // Beatriz
      receiverId: 'user-1',  // Ana
      offeredSkill: 'Inglês para Entrevistas Tech',
      desiredSkill: 'React.js & Hooks',
      proposalNote: 'Olá Ana! Adoraria praticar inglês com você para processos seletivos internacionais em troca de introdução a React.',
      status: 'PENDING',
      createdAt: '2026-10-22T19:15:00Z',
      classesCount: 0
    },
    {
      id: 'exc-3',
      requesterId: 'user-1', // Ana
      receiverId: 'user-4',  // Gabriel
      offeredSkill: 'React.js & Hooks',
      desiredSkill: 'SQL & Modelagem de Dados',
      proposalNote: 'Oi Gabriel! Vamos trocar aulas de SQL por React?',
      status: 'COMPLETED',
      createdAt: '2026-10-10T10:00:00Z',
      acceptedAt: '2026-10-10T11:00:00Z',
      completedAt: '2026-10-18T18:00:00Z',
      classesCount: 4
    }
  ],

  // Chat messages (RF11)
  messages: [
    {
      id: 'msg-1',
      senderId: 'user-2',
      receiverId: 'user-1',
      content: 'Oi Ana! Muito feliz que aceitou a proposta de troca!',
      timestamp: '2026-10-21T10:00:00Z'
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      receiverId: 'user-2',
      content: 'Oi Carlos! Eu também! Já organizei um projeto básico com Vite + React para te passar o passo a passo.',
      timestamp: '2026-10-21T10:05:00Z'
    },
    {
      id: 'msg-3',
      senderId: 'user-2',
      receiverId: 'user-1',
      content: 'Sensacional! Eu separei um arquivo com Auto-Layout e variáveis de Design Tokens no Figma. Marquei a aula na nossa agenda para hoje!',
      timestamp: '2026-10-22T14:30:00Z'
    },
    {
      id: 'msg-4',
      senderId: 'user-1',
      receiverId: 'user-2',
      content: 'Perfeito! Já confirmei na agenda. Vou entrar pela sala WebRTC daqui a pouco.',
      timestamp: '2026-10-23T09:10:00Z'
    }
  ],

  // Scheduled Classes (RF13)
  scheduledClasses: [
    {
      id: 'class-1',
      exchangeId: 'exc-1',
      teacherId: 'user-2',
      studentId: 'user-1',
      title: 'Workshop de Figma: Auto-Layout & Componentes Reutilizáveis',
      scheduledAt: '2026-10-23T15:00:00',
      durationMinutes: 60,
      status: 'SCHEDULED', // SCHEDULED, COMPLETED, CANCELLED
      meetingRoomId: 'room-carlos-ana-figma'
    },
    {
      id: 'class-2',
      exchangeId: 'exc-1',
      teacherId: 'user-1',
      studentId: 'user-2',
      title: 'Construindo Componentes React a partir do Figma',
      scheduledAt: '2026-10-25T19:30:00',
      durationMinutes: 60,
      status: 'SCHEDULED',
      meetingRoomId: 'room-ana-carlos-react'
    }
  ],

  // Reviews (RF14)
  reviews: [
    {
      id: 'rev-1',
      exchangeId: 'exc-3',
      reviewerId: 'user-4', // Gabriel
      reviewedUserId: 'user-1', // Ana
      rating: 5,
      comment: 'A Ana é uma professora espetacular! Em 4 aulas ela me ensinou desde criar o app até integrar com API Rest em React.',
      createdAt: '2026-10-18T19:00:00Z'
    },
    {
      id: 'rev-2',
      exchangeId: 'exc-3',
      reviewerId: 'user-1', // Ana
      reviewedUserId: 'user-4', // Gabriel
      rating: 5,
      comment: 'Gabriel tem uma didática incrível para ensinar consultas complexas e índices em PostgreSQL.',
      createdAt: '2026-10-18T19:15:00Z'
    }
  ],

  // Achievements & Gamification (RF19)
  achievements: [
    {
      id: 'ach-1',
      code: 'FIRST_LOGIN',
      title: 'Boas-Vindas à Colaboração',
      description: 'Criou sua conta e ingressou na rede de troca de conhecimentos.',
      icon: 'sparkles',
      points: 50,
      unlocked: true,
      unlockedAt: '2026-10-15'
    },
    {
      id: 'ach-2',
      code: 'FIRST_EXCHANGE',
      title: 'Primeira Permuta',
      description: 'Completou com sucesso sua primeira troca recíproca.',
      icon: 'repeat',
      points: 100,
      unlocked: true,
      unlockedAt: '2026-10-18'
    },
    {
      id: 'ach-3',
      code: 'PERFECT_MATCH',
      title: 'Match Bilateral Perfeito',
      description: 'Conectou-se com um parceiro com 90%+ de compatibilidade pelo algoritmo IA.',
      icon: 'heart-handshake',
      points: 150,
      unlocked: true,
      unlockedAt: '2026-10-20'
    },
    {
      id: 'ach-4',
      code: 'VIDEO_MASTER',
      title: 'Mestre da Sala Virtual',
      description: 'Completou mais de 3 horas em videochamadas ao vivo via WebRTC.',
      icon: 'video',
      points: 120,
      unlocked: false,
      unlockedAt: null
    },
    {
      id: 'ach-5',
      code: 'FIVE_STAR_MENTOR',
      title: 'Mentor 5 Estrelas',
      description: 'Mantenha média máxima em pelo menos 10 avaliações consecutivas.',
      icon: 'star',
      points: 200,
      unlocked: false,
      unlockedAt: null
    },
    {
      id: 'ach-6',
      code: 'KNOWLEDGE_HERO',
      title: 'Embaixador do Conhecimento',
      description: 'Acumule 1.000 XP e obtenha seu Certificado Digital de Excelência.',
      icon: 'award',
      points: 500,
      unlocked: false,
      unlockedAt: null
    }
  ],

  // Certificates (RF20)
  certificates: [
    {
      id: 'cert-1',
      userId: 'user-1',
      userName: 'Ana Silva',
      mentorName: 'Gabriel Rocha',
      skillName: 'SQL Avançado & Otimização de Bancos Relacionais',
      hoursCompleted: 8,
      verificationCode: 'SKILL-9F8A-42E1-BC77',
      issuedAt: '2026-10-18',
      description: 'Certificado de conclusão de mentoria bilateral por permuta de saberes no SkillSwap.'
    }
  ],

  // Verifications pending for Admin (RF16)
  verifications: [
    {
      id: 'ver-1',
      userId: 'user-3',
      userName: 'Beatriz Lima',
      professionTitle: 'Professora Certificada de Cambridge & Tradutora Juramentada',
      documentUrl: 'diploma-cambridge-c2-beatriz.pdf',
      status: 'PENDING',
      createdAt: '2026-10-22T08:00:00Z',
      notes: 'Envio de comprovante de proficiência internacional C2 Proficiency e diploma de Letras.'
    },
    {
      id: 'ver-2',
      userId: 'user-2',
      userName: 'Carlos Mendes',
      professionTitle: 'Lead Product Designer - Certificado Nielsen Norman Group',
      documentUrl: 'nng-ux-master-carlos.pdf',
      status: 'APPROVED',
      createdAt: '2026-10-15T12:00:00Z',
      notes: 'Certificação Master UX verificada na base oficial NNG.'
    }
  ],

  // Reports for Admin (RF15)
  reports: [
    {
      id: 'rep-1',
      reporterId: 'user-2',
      reporterName: 'Carlos Mendes',
      reportedUserId: 'user-spam',
      reportedUserName: 'Marcos Vendas Cursos',
      reason: 'COBRANCA_INDEVIDA',
      description: 'O usuário me enviou mensagem no chat tentando cobrar R$ 150 por aula em vez de fazer a troca de conhecimentos gratuita.',
      status: 'PENDING',
      createdAt: '2026-10-22T21:40:00Z'
    }
  ],

  // Notifications (RF18)
  notifications: [
    {
      id: 'notif-1',
      title: 'Nova Proposta de Permuta!',
      message: 'Beatriz Lima quer trocar Inglês por suas aulas de React.',
      link: '#trocas',
      isRead: false,
      timestamp: '2026-10-22T19:15:00Z'
    },
    {
      id: 'notif-2',
      title: 'Aula Agendada Hoje!',
      message: 'Sua aula de Figma com Carlos Mendes começa às 15:00.',
      link: '#agenda',
      isRead: false,
      timestamp: '2026-10-23T08:00:00Z'
    },
    {
      id: 'notif-3',
      title: 'Parabéns! +150 XP',
      message: 'Você desbloqueou a insígnia "Match Bilateral Perfeito"!',
      link: '#conquistas',
      isRead: true,
      timestamp: '2026-10-20T16:01:00Z'
    }
  ]
};

// Load or initialize state
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.users && Array.isArray(parsed.users)) {
        parsed.users.forEach(u => {
          if (!u.password) u.password = '123456';
        });
      }
      if (parsed.currentUser && !parsed.currentUser.password) {
        parsed.currentUser.password = '123456';
      }
      return parsed;
    }
  } catch (e) {
    console.error('Erro ao ler localStorage', e);
  }
  return defaultState;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Erro ao salvar localStorage', e);
  }
}

// Global active state
let appState = loadState();

// Calculate IA Match Score (RF08)
// Formula: S = S_skills (50) + S_reputation (20) + S_availability (15) + S_categories (10) + S_location (5) + S_verified (5)
function calculateMatchScore(currentUser, candidateUser) {
  if (currentUser.id === candidateUser.id) return { total: 0, breakdown: {} };

  let sSkills = 0;
  let sReputation = 0;
  let sAvailability = 0;
  let sCategories = 0;
  let sLocation = 0;
  let sVerified = 0;

  // 1. Bilateral vs Unilateral Skills (50 pts)
  const candidateTeachesWhatIWant = candidateUser.skillsTeaching.some(st =>
    currentUser.skillsLearning.some(sl => sl.name.toLowerCase().includes(st.name.toLowerCase()) || st.name.toLowerCase().includes(sl.name.toLowerCase()))
  );
  
  const iTeachWhatCandidateWants = currentUser.skillsTeaching.some(st =>
    candidateUser.skillsLearning.some(sl => sl.name.toLowerCase().includes(st.name.toLowerCase()) || st.name.toLowerCase().includes(sl.name.toLowerCase()))
  );

  let matchType = 'Sem correspondência direta';
  if (candidateTeachesWhatIWant && iTeachWhatCandidateWants) {
    sSkills = 50;
    matchType = 'Permuta Bilateral Perfeita (Ambos ensinam o que o outro quer aprender)';
  } else if (candidateTeachesWhatIWant) {
    sSkills = 30;
    matchType = 'Unilateral: Parceiro ensina o que você busca';
  } else if (iTeachWhatCandidateWants) {
    sSkills = 20;
    matchType = 'Unilateral: Você ensina o que o parceiro busca';
  } else {
    sSkills = 10; // Baseline afinidade geral
  }

  // 2. Reputation (20 pts)
  if (candidateUser.reviewsCount > 0) {
    sReputation = Math.round((candidateUser.rating / 5.0) * 20);
  } else {
    sReputation = 15; // Baseline de incentivo para membros novos
  }

  // 3. Availability overlap (15 pts)
  const sharedAvailability = currentUser.availability.filter(a => candidateUser.availability.includes(a));
  if (sharedAvailability.length >= 2) {
    sAvailability = 15;
  } else if (sharedAvailability.length === 1) {
    sAvailability = 10;
  } else {
    sAvailability = 5;
  }

  // 4. Categories overlap (10 pts)
  const myCategories = new Set([
    ...currentUser.skillsTeaching.map(s => s.category),
    ...currentUser.skillsLearning.map(s => s.category)
  ]);
  const candidateCategories = new Set([
    ...candidateUser.skillsTeaching.map(s => s.category),
    ...candidateUser.skillsLearning.map(s => s.category)
  ]);
  const sharedCat = [...myCategories].filter(c => candidateCategories.has(c));
  sCategories = sharedCat.length > 0 ? 10 : 3;

  // 5. Geographic location (5 pts)
  if (currentUser.location && candidateUser.location) {
    const myState = currentUser.location.split(',')[1]?.trim() || '';
    const candState = candidateUser.location.split(',')[1]?.trim() || '';
    if (currentUser.location === candidateUser.location) {
      sLocation = 5;
    } else if (myState && candState && myState === candState) {
      sLocation = 4;
    } else {
      sLocation = 2; // Ambos online
    }
  }

  // 6. Verified instructor bonus (5 pts)
  if (candidateUser.isVerified) {
    sVerified = 5;
  }

  const total = Math.min(100, Math.round(sSkills + sReputation + sAvailability + sCategories + sLocation + sVerified));

  return {
    total,
    matchType,
    breakdown: {
      skills: sSkills,
      reputation: sReputation,
      availability: sAvailability,
      categories: sCategories,
      location: sLocation,
      verified: sVerified
    }
  };
}

// Gamification: Add XP and trigger celebrations (RF19)
function addXP(points, reason) {
  appState.currentUser.xp += points;
  const oldLevel = appState.currentUser.level;
  
  // Calculate new level
  let newLevel = 1;
  if (appState.currentUser.xp >= 1000) newLevel = 5;
  else if (appState.currentUser.xp >= 500) newLevel = 4;
  else if (appState.currentUser.xp >= 250) newLevel = 3;
  else if (appState.currentUser.xp >= 100) newLevel = 2;

  appState.currentUser.level = newLevel;

  // Sync current user into users array
  const uIndex = appState.users.findIndex(u => u.id === appState.currentUser.id);
  if (uIndex !== -1) {
    appState.users[uIndex].xp = appState.currentUser.xp;
    appState.users[uIndex].level = appState.currentUser.level;
  }

  saveState();
  renderAppNavbar();

  // Show floating toast
  showXPToast(points, reason);

  // Trigger confetti if level up or big points
  if (newLevel > oldLevel || points >= 100) {
    triggerConfetti();
  }
}

function showXPToast(points, reason) {
  const container = document.getElementById('xp-toasts-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'xp-toast flex items-center gap-3 px-4 py-2.5 rounded-full bg-emerald-500/95 text-white font-medium shadow-lg shadow-emerald-500/30 border border-emerald-300/40 backdrop-blur-md mb-2';
  toast.innerHTML = `
    <span class="text-xl">⚡</span>
    <span class="font-bold tracking-wide">+${points} XP</span>
    <span class="text-xs text-emerald-100 font-normal">(${reason})</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Routing / View Switching
let currentView = 'explorar'; // 'explorar', 'trocas', 'chat', 'aula', 'agenda', 'conquistas', 'perfil', 'admin', 'certificado'

function switchView(viewName, params = {}) {
  // If not logged in and not viewing certificate, redirect to auth
  if (!appState.currentUser && viewName !== 'certificado' && viewName !== 'auth' && viewName !== 'login' && viewName !== 'cadastro') {
    viewName = 'auth';
  }

  currentView = viewName;
  window.location.hash = viewName;
  
  // Update navbar links active state
  document.querySelectorAll('[data-nav-target]').forEach(el => {
    const target = el.getAttribute('data-nav-target');
    if (target === viewName) {
      el.classList.add('text-blue-400', 'bg-blue-500/10', 'font-semibold');
      el.classList.remove('text-gray-400', 'hover:text-white');
    } else {
      el.classList.remove('text-blue-400', 'bg-blue-500/10', 'font-semibold');
      el.classList.add('text-gray-400', 'hover:text-white');
    }
  });

  const main = document.getElementById('main-content');
  if (!main) return;

  switch (viewName) {
    case 'auth':
    case 'login':
    case 'cadastro':
      renderAuthView(main, params.mode || (viewName === 'cadastro' ? 'cadastro' : 'login'));
      break;
    case 'explorar':
      renderExplorarView(main);
      break;
    case 'trocas':
      renderTrocasView(main);
      break;
    case 'chat':
      renderChatView(main, params.partnerId);
      break;
    case 'aula':
      renderAulaVideoView(main, params.roomId);
      break;
    case 'agenda':
      renderAgendaView(main);
      break;
    case 'conquistas':
      renderConquistasView(main);
      break;
    case 'perfil':
      renderPerfilView(main);
      break;
    case 'admin':
      renderAdminView(main);
      break;
    case 'certificado':
      renderCertificadoView(main, params.code);
      break;
    default:
      renderExplorarView(main);
  }

  // Refresh lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Switch current logged in profile (Demo Persona switcher)
function switchUser(userId) {
  const selected = appState.users.find(u => u.id === userId);
  if (!selected) return;
  appState.currentUser = { ...selected };
  saveState();
  renderAppNavbar();
  switchView(currentView);
  showToast(`Alternado para perfil: ${selected.name} (${selected.role})`);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('xp-toasts-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'error' ? 'bg-red-500/90' : 'bg-slate-800/95 border-slate-700 text-white';
  toast.className = `xp-toast flex items-center gap-3 px-4 py-2.5 rounded-xl ${bg} text-sm font-medium shadow-xl border backdrop-blur-md mb-2`;
  toast.innerHTML = `<span>🔔</span> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ----------------- NAVBAR RENDERER -----------------
function renderAppNavbar() {
  const user = appState.currentUser;

  // Guest Navbar (When user is not logged in)
  if (!user) {
    const guestNavHtml = `
      <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-3 cursor-pointer" onclick="switchView('auth', { mode: 'login' })">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-blue-500/25">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <i data-lucide="arrow-left-right" class="w-5 h-5 text-blue-400"></i>
              </div>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-display font-black text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  SkillSwap
                </span>
                <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Moeda Zero
                </span>
              </div>
              <p class="text-[10px] text-slate-400 -mt-1 hidden sm:block">Permuta Bilateral de Conhecimento</p>
            </div>
          </div>

          <!-- Auth CTA Buttons -->
          <div class="flex items-center gap-3">
            <button onclick="switchView('auth', { mode: 'login' })" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-1.5">
              <i data-lucide="log-in" class="w-4 h-4 text-blue-400"></i>
              <span>Entrar</span>
            </button>
            <button onclick="switchView('auth', { mode: 'cadastro' })" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-1.5">
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>Cadastrar-se (+50 XP)</span>
            </button>
          </div>
        </div>
      </header>
    `;
    const headerContainer = document.getElementById('navbar-container');
    if (headerContainer) {
      headerContainer.innerHTML = guestNavHtml;
      if (window.lucide) window.lucide.createIcons();
    }
    return;
  }

  const unreadNotifs = appState.notifications.filter(n => !n.isRead).length;

  const xpPercentage = (user.xp % 250) / 2.5;

  const navHtml = `
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Brand Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="switchView('explorar')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-blue-500/25">
            <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <i data-lucide="arrow-left-right" class="w-5 h-5 text-blue-400"></i>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-display font-black text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                SkillSwap
              </span>
              <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Moeda Zero
              </span>
            </div>
            <p class="text-[10px] text-slate-400 -mt-1 hidden sm:block">Permuta Bilateral de Conhecimento</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-1">
          <button data-nav-target="explorar" onclick="switchView('explorar')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2">
            <i data-lucide="compass" class="w-4 h-4"></i> Explorar & Match
          </button>
          <button data-nav-target="trocas" onclick="switchView('trocas')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 relative">
            <i data-lucide="repeat" class="w-4 h-4"></i> Trocas
            ${appState.exchanges.filter(e => e.receiverId === user.id && e.status === 'PENDING').length > 0 ? 
              `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-1"></span>` : ''}
          </button>
          <button data-nav-target="chat" onclick="switchView('chat')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4"></i> Chat
          </button>
          <button data-nav-target="agenda" onclick="switchView('agenda')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4"></i> Agenda
          </button>
          <button data-nav-target="conquistas" onclick="switchView('conquistas')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2">
            <i data-lucide="trophy" class="w-4 h-4"></i> Conquistas
          </button>
          ${user.role === 'ADMIN' ? `
            <button data-nav-target="admin" onclick="switchView('admin')" class="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30 font-medium">
              <i data-lucide="shield-check" class="w-4 h-4"></i> Painel Admin
            </button>
          ` : ''}
        </nav>

        <!-- Right Side: Gamification Pill, Notifications, User Menu -->
        <div class="flex items-center gap-3">
          
          <!-- Duolingo XP Pill -->
          <div onclick="switchView('conquistas')" class="cursor-pointer group flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 hover:border-emerald-400/60 transition-all shadow-sm">
            <div class="flex items-center text-amber-400 text-xs font-bold gap-1">
              <i data-lucide="flame" class="w-4 h-4 fill-amber-400 text-amber-500"></i>
              <span>${user.streakDays || 5}d</span>
            </div>
            <div class="h-3 w-[1px] bg-slate-700"></div>
            <div class="flex items-center text-emerald-400 text-xs font-extrabold gap-1">
              <i data-lucide="zap" class="w-3.5 h-3.5 fill-emerald-400"></i>
              <span>${user.xp} XP</span>
            </div>
            <span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase">
              Nv.${user.level}
            </span>
          </div>

          <!-- Notification Bell -->
          <div class="relative">
            <button id="notif-toggle-btn" onclick="toggleNotificationDropdown()" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative">
              <i data-lucide="bell" class="w-5 h-5"></i>
              ${unreadNotifs > 0 ? `
                <span class="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                  ${unreadNotifs}
                </span>
              ` : ''}
            </button>
            <div id="notif-dropdown" class="hidden absolute right-0 mt-2 w-80 rounded-2xl glass-dropdown p-4 z-50">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <span class="font-bold text-sm text-slate-200">Notificações In-App</span>
                <span class="text-xs text-blue-400 cursor-pointer" onclick="markAllNotifsRead()">Marcar como lidas</span>
              </div>
              <div class="divide-y divide-slate-800 max-h-64 overflow-y-auto mt-2">
                ${appState.notifications.map(n => `
                  <div class="py-2.5 text-xs cursor-pointer hover:bg-slate-800/50 p-2 rounded-lg transition-colors" onclick="handleNotificationClick('${n.id}', '${n.link}')">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-slate-200 ${!n.isRead ? 'text-blue-300' : ''}">${n.title}</span>
                      ${!n.isRead ? '<span class="w-2 h-2 rounded-full bg-blue-500"></span>' : ''}
                    </div>
                    <p class="text-slate-400 mt-1">${n.message}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- User Menu & Persona Switcher -->
          <div class="relative">
            <button id="user-menu-btn" onclick="toggleUserDropdown()" class="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-blue-500/40 transition-all">
              <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border border-slate-700">
            </button>
            <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-72 rounded-2xl glass-dropdown p-4 z-50">
              <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
                <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover">
                <div class="overflow-hidden">
                  <div class="flex items-center gap-1.5">
                    <p class="font-bold text-sm text-slate-200 truncate">${user.name}</p>
                    ${user.isVerified ? '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-blue-400 shrink-0"></i>' : ''}
                  </div>
                  <p class="text-xs text-slate-400 truncate">${user.email}</p>
                  <span class="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${user.role === 'ADMIN' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'}">
                    Perfil ${user.role}
                  </span>
                </div>
              </div>

              <!-- Persona Switcher -->
              <div class="pt-3">
                <p class="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Simular Outro Usuário (Demo)</p>
                <div class="space-y-1">
                  ${appState.users.map(u => `
                    <button onclick="switchUser('${u.id}')" class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-slate-800 ${u.id === user.id ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300'}">
                      <div class="flex items-center gap-2">
                        <img src="${u.avatar}" class="w-5 h-5 rounded-full object-cover">
                        <span>${u.name}</span>
                      </div>
                      <span class="text-[10px] text-slate-500">${u.role}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
                <button onclick="switchView('perfil')" class="text-slate-300 hover:text-white flex items-center gap-1">
                  <i data-lucide="user" class="w-3.5 h-3.5"></i> Meu Perfil
                </button>
                <button onclick="switchView('certificado', { code: 'SKILL-9F8A-42E1-BC77' })" class="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <i data-lucide="award" class="w-3.5 h-3.5"></i> Certificado
                </button>
              </div>

              <div class="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                <button onclick="switchView('auth', { mode: 'login' })" class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors">
                  <span class="flex items-center gap-2">
                    <i data-lucide="repeat" class="w-3.5 h-3.5 text-blue-400"></i>
                    Tela de Acesso / Trocar Conta
                  </span>
                  <i data-lucide="chevron-right" class="w-3 h-3 text-slate-500"></i>
                </button>
                <button onclick="handleLogout()" class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors">
                  <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                  Sair da Conta (Logout)
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  `;

  const headerContainer = document.getElementById('navbar-container');
  if (headerContainer) {
    headerContainer.innerHTML = navHtml;
    if (window.lucide) window.lucide.createIcons();
  }
}

function toggleNotificationDropdown() {
  const el = document.getElementById('notif-dropdown');
  el?.classList.toggle('hidden');
}

function markAllNotifsRead() {
  appState.notifications.forEach(n => n.isRead = true);
  saveState();
  renderAppNavbar();
}

function handleNotificationClick(notifId, link) {
  const n = appState.notifications.find(item => item.id === notifId);
  if (n) n.isRead = true;
  saveState();
  renderAppNavbar();
  document.getElementById('notif-dropdown')?.classList.add('hidden');
  const target = link.replace('#', '');
  switchView(target);
}

function toggleUserDropdown() {
  const el = document.getElementById('user-dropdown');
  el?.classList.toggle('hidden');
}

// ----------------- VIEW 0: TELA DE ACESSO (LOGIN & CADASTRO - RF01, RF02) -----------------
let currentAuthTab = 'login';

function renderAuthView(container, mode = 'login') {
  currentAuthTab = mode;

  container.innerHTML = `
    <div class="max-w-5xl mx-auto py-4 sm:py-8 px-2 sm:px-4 auth-panel-anim">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left Side: Platform Presentation & Value Pillars -->
        <div class="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-indigo-950/60 border border-blue-500/20 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
          <div class="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

          <div class="relative z-10">
            <!-- Brand Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-400"></i>
              Portal de Acesso SkillSwap
            </div>

            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Aprenda, ensine e evolua com a <br>
              <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                Moeda Zero.
              </span>
            </h1>

            <p class="mt-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Troque conhecimentos de forma recíproca e simétrica. Você doa 1 hora do que domina e recebe 1 hora do que deseja aprender, sem custos financeiros.
            </p>

            <!-- Key Features List -->
            <div class="mt-6 sm:mt-8 space-y-3.5">
              <div class="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <i data-lucide="cpu" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-slate-200">Algoritmo IA Match 2.0</h4>
                  <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Cruzamento inteligente de competências complementares.</p>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <i data-lucide="video" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-slate-200">Videochamadas WebRTC</h4>
                  <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Aulas ao vivo no navegador com áudio, vídeo e tela.</p>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <i data-lucide="trophy" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-slate-200">Gamificação e Certificados</h4>
                  <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Ganhe XP, desbloqueie insígnias e emita certificados com hash.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Metric -->
          <div class="relative z-10 mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-slate-300 font-medium">+1.450 trocas realizadas</span>
            </div>
            <span class="text-emerald-400 font-bold">100% Gratuito</span>
          </div>
        </div>

        <!-- Right Side: Auth Card (Login & Cadastro) -->
        <div class="lg:col-span-7">
          <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
            
            <!-- Segmented Tab Controls: Login vs Cadastro -->
            <div class="flex p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800/90 mb-6">
              <button 
                id="tab-btn-login" 
                type="button"
                onclick="switchAuthTab('login')" 
                class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${currentAuthTab === 'login' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-slate-200'}">
                <i data-lucide="log-in" class="w-4 h-4"></i>
                <span>Entrar (Login)</span>
              </button>
              <button 
                id="tab-btn-cadastro" 
                type="button"
                onclick="switchAuthTab('cadastro')" 
                class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${currentAuthTab === 'cadastro' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-200'}">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Criar Conta (Cadastro)</span>
              </button>
            </div>

            <!-- Error/Success Alert Box -->
            <div id="auth-alert" class="hidden mb-5 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2.5"></div>

            <!-- ================= FORMULÁRIO DE LOGIN ================= -->
            <div id="auth-panel-login" class="${currentAuthTab === 'login' ? 'block' : 'hidden'}">
              <div class="mb-5">
                <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Bem-vindo(a) de volta!</h2>
                <p class="text-xs text-slate-400 mt-1">Informe seu e-mail e senha cadastrados para entrar na plataforma.</p>
              </div>

              <form onsubmit="handleLoginSubmit(event)" class="space-y-4">
                <!-- E-mail -->
                <div>
                  <label for="login-email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    E-mail
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <i data-lucide="mail" class="w-4 h-4"></i>
                    </div>
                    <input 
                      type="email" 
                      id="login-email" 
                      required 
                      placeholder="seu.email@exemplo.com" 
                      class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                  </div>
                </div>

                <!-- Senha -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="login-password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Senha
                    </label>
                    <button type="button" onclick="openForgotPasswordModal()" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <i data-lucide="lock" class="w-4 h-4"></i>
                    </div>
                    <input 
                      type="password" 
                      id="login-password" 
                      required 
                      placeholder="Digite sua senha" 
                      class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                    <button 
                      type="button" 
                      onclick="togglePasswordVisibility('login-password', 'login-pwd-icon')" 
                      class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      title="Exibir ou ocultar senha">
                      <i id="login-pwd-icon" data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

                <!-- Lembrar de mim -->
                <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label class="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" id="login-remember" checked class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950">
                    <span>Lembrar meu acesso neste dispositivo</span>
                  </label>
                </div>

                <!-- Botão Entrar -->
                <button 
                  type="submit" 
                  id="login-submit-btn"
                  class="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2">
                  <i data-lucide="log-in" class="w-4 h-4"></i>
                  <span>Entrar na Plataforma</span>
                </button>
              </form>

              <!-- Quick Demo Accounts -->
              <div class="mt-6 pt-5 border-t border-slate-800/80">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contas Demo Rápidas (1 Clique)</span>
                  <span class="text-[10px] text-slate-500">Senha: 123456</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button type="button" onclick="fillQuickLogin('ana.silva@tech.com', '123456')" class="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all group">
                    <div class="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" class="w-6 h-6 rounded-full object-cover">
                      <div class="overflow-hidden">
                        <p class="text-xs font-semibold text-slate-200 group-hover:text-blue-400 truncate">Ana Silva</p>
                        <p class="text-[10px] text-slate-500 truncate">React / Front</p>
                      </div>
                    </div>
                  </button>

                  <button type="button" onclick="fillQuickLogin('carlos.mendes@design.com', '123456')" class="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all group">
                    <div class="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" class="w-6 h-6 rounded-full object-cover">
                      <div class="overflow-hidden">
                        <p class="text-xs font-semibold text-slate-200 group-hover:text-blue-400 truncate">Carlos Mendes</p>
                        <p class="text-[10px] text-slate-500 truncate">UX / Figma</p>
                      </div>
                    </div>
                  </button>

                  <button type="button" onclick="fillQuickLogin('admin@skillswap.com', '123456')" class="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-rose-500/20 text-left transition-all group sm:col-span-1 col-span-2">
                    <div class="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" class="w-6 h-6 rounded-full object-cover">
                      <div class="overflow-hidden">
                        <p class="text-xs font-semibold text-rose-300 group-hover:text-rose-200 truncate">Rodrigo (Admin)</p>
                        <p class="text-[10px] text-slate-500 truncate">Moderação</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div class="mt-5 text-center">
                <p class="text-xs text-slate-400">
                  Ainda não tem conta no SkillSwap? 
                  <button type="button" onclick="switchAuthTab('cadastro')" class="font-bold text-emerald-400 hover:text-emerald-300 hover:underline">
                    Cadastre-se grátis (+50 XP)
                  </button>
                </p>
              </div>
            </div>

            <!-- ================= FORMULÁRIO DE CADASTRO ================= -->
            <div id="auth-panel-cadastro" class="${currentAuthTab === 'cadastro' ? 'block' : 'hidden'}">
              <div class="mb-5">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Criar Conta Gratuita</h2>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider">
                    Bônus +50 XP
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-1">Preencha os campos abaixo com seu e-mail e senha para começar.</p>
              </div>

              <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
                <!-- Nome Completo -->
                <div>
                  <label for="reg-name" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Nome Completo *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <i data-lucide="user" class="w-4 h-4"></i>
                    </div>
                    <input 
                      type="text" 
                      id="reg-name" 
                      required 
                      placeholder="Ex: Mariana Castro" 
                      class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    >
                  </div>
                </div>

                <!-- E-mail -->
                <div>
                  <label for="reg-email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    E-mail *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <i data-lucide="mail" class="w-4 h-4"></i>
                    </div>
                    <input 
                      type="email" 
                      id="reg-email" 
                      required 
                      placeholder="seu.email@exemplo.com" 
                      class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    >
                  </div>
                </div>

                <!-- Senha e Confirmação de Senha em 2 colunas -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <!-- Senha -->
                  <div>
                    <label for="reg-password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Senha *
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <i data-lucide="lock" class="w-4 h-4"></i>
                      </div>
                      <input 
                        type="password" 
                        id="reg-password" 
                        required 
                        minlength="6"
                        placeholder="Mín. 6 caracteres" 
                        oninput="updatePasswordStrength(this.value)"
                        class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                      <button 
                        type="button" 
                        onclick="togglePasswordVisibility('reg-password', 'reg-pwd-icon')" 
                        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                        title="Exibir ou ocultar senha">
                        <i id="reg-pwd-icon" data-lucide="eye" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Confirmar Senha -->
                  <div>
                    <label for="reg-confirm-password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Confirmar Senha *
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                      </div>
                      <input 
                        type="password" 
                        id="reg-confirm-password" 
                        required 
                        minlength="6"
                        placeholder="Repita a senha" 
                        class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                    </div>
                  </div>
                </div>

                <!-- Password Strength Meter -->
                <div id="pwd-strength-container" class="space-y-1">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-slate-400">Força da Senha:</span>
                    <span id="pwd-strength-text" class="font-bold text-slate-500">Aguardando senha</span>
                  </div>
                  <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div id="pwd-strength-bar" class="h-full w-0 bg-rose-500"></div>
                  </div>
                </div>

                <!-- Habilidades Iniciais (O que ensina / O que aprende) -->
                <div class="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <span class="block text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Seu Perfil de Conhecimentos (Opcional)
                  </span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="reg-skill-teach" class="block text-xs text-slate-300 mb-1">
                        O que você pode ensinar?
                      </label>
                      <input 
                        type="text" 
                        id="reg-skill-teach" 
                        placeholder="Ex: JavaScript, Violão, Fotografia" 
                        class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      >
                    </div>
                    <div>
                      <label for="reg-skill-learn" class="block text-xs text-slate-300 mb-1">
                        O que você deseja aprender?
                      </label>
                      <input 
                        type="text" 
                        id="reg-skill-learn" 
                        placeholder="Ex: Inglês, UX Design, Python" 
                        class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      >
                    </div>
                  </div>
                </div>

                <!-- Checkbox Termo Moeda Zero -->
                <div class="pt-1">
                  <label class="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                    <input type="checkbox" id="reg-terms" required class="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-950">
                    <span>
                      Concordo com os Termos de Uso e com o princípio da <strong class="text-emerald-400">Moeda Zero</strong> (proibida qualquer remuneração ou cobrança financeira).
                    </span>
                  </label>
                </div>

                <!-- Botão Cadastrar -->
                <button 
                  type="submit" 
                  id="reg-submit-btn"
                  class="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                  <span>Criar Conta e Conquistar 50 XP 🎉</span>
                </button>
              </form>

              <div class="mt-5 text-center">
                <p class="text-xs text-slate-400">
                  Já possui uma conta ativa? 
                  <button type="button" onclick="switchAuthTab('login')" class="font-bold text-blue-400 hover:text-blue-300 hover:underline">
                    Fazer Login
                  </button>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// Alternar abas entre Login e Cadastro
function switchAuthTab(tab) {
  currentAuthTab = tab;
  
  const loginPanel = document.getElementById('auth-panel-login');
  const cadastroPanel = document.getElementById('auth-panel-cadastro');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnCadastro = document.getElementById('tab-btn-cadastro');
  const alertEl = document.getElementById('auth-alert');

  if (alertEl) alertEl.classList.add('hidden');

  if (tab === 'login') {
    loginPanel?.classList.remove('hidden');
    cadastroPanel?.classList.add('hidden');

    tabBtnLogin?.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30');
    tabBtnLogin?.classList.remove('text-slate-400', 'hover:text-slate-200');

    tabBtnCadastro?.classList.remove('bg-gradient-to-r', 'from-emerald-600', 'to-teal-600', 'text-white', 'shadow-lg', 'shadow-emerald-600/30');
    tabBtnCadastro?.classList.add('text-slate-400', 'hover:text-slate-200');
  } else {
    loginPanel?.classList.add('hidden');
    cadastroPanel?.classList.remove('hidden');

    tabBtnCadastro?.classList.add('bg-gradient-to-r', 'from-emerald-600', 'to-teal-600', 'text-white', 'shadow-lg', 'shadow-emerald-600/30');
    tabBtnCadastro?.classList.remove('text-slate-400', 'hover:text-slate-200');

    tabBtnLogin?.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30');
    tabBtnLogin?.classList.add('text-slate-400', 'hover:text-slate-200');
  }

  if (window.lucide) window.lucide.createIcons();
}

// Exibir alertas no cartão de autenticação
function showAuthAlert(type, message) {
  const alertEl = document.getElementById('auth-alert');
  if (!alertEl) return;

  const isError = type === 'error';
  alertEl.className = `mb-5 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2.5 ${
    isError 
      ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300' 
      : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
  }`;
  alertEl.innerHTML = `
    <i data-lucide="${isError ? 'alert-triangle' : 'check-circle'}" class="w-4 h-4 shrink-0"></i>
    <span>${message}</span>
  `;
  alertEl.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// Alternar visibilidade de senha (olho)
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    icon.setAttribute('data-lucide', 'eye');
  }
  if (window.lucide) window.lucide.createIcons();
}

// Medidor visual de força da senha
function updatePasswordStrength(pwd) {
  const bar = document.getElementById('pwd-strength-bar');
  const text = document.getElementById('pwd-strength-text');
  if (!bar || !text) return;

  if (!pwd || pwd.length === 0) {
    bar.style.width = '0%';
    bar.className = 'h-full bg-slate-700';
    text.innerText = 'Aguardando senha';
    text.className = 'font-bold text-slate-500';
    return;
  }

  let score = 0;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 8) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  if (score <= 1) {
    bar.style.width = '30%';
    bar.className = 'h-full bg-rose-500';
    text.innerText = 'Fraca (mínimo 6 caracteres)';
    text.className = 'font-bold text-rose-400';
  } else if (score <= 2) {
    bar.style.width = '65%';
    bar.className = 'h-full bg-amber-500';
    text.innerText = 'Média (boa, adicione números/símbolos)';
    text.className = 'font-bold text-amber-400';
  } else {
    bar.style.width = '100%';
    bar.className = 'h-full bg-emerald-500';
    text.innerText = 'Forte (excelente proteção)';
    text.className = 'font-bold text-emerald-400';
  }
}

// Preenchimento e login rápido para demonstração
function fillQuickLogin(email, password) {
  const emailInput = document.getElementById('login-email');
  const pwdInput = document.getElementById('login-password');
  if (emailInput && pwdInput) {
    emailInput.value = email;
    pwdInput.value = password;
  }
  
  const foundUser = appState.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (foundUser) {
    appState.currentUser = { ...foundUser };
    saveState();
    renderAppNavbar();
    showToast(`Login realizado como ${foundUser.name}!`);
    triggerConfetti();
    switchView('explorar');
  }
}

// Submissão do Formulário de Login (RF02)
function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const pwdInput = document.getElementById('login-password');
  if (!emailInput || !pwdInput) return;

  const email = emailInput.value.trim().toLowerCase();
  const password = pwdInput.value;

  const user = appState.users.find(u => u.email.toLowerCase() === email);

  if (!user) {
    showAuthAlert('error', 'Nenhum usuário encontrado com este e-mail. Verifique a digitação ou crie sua conta na aba Cadastrar.');
    return;
  }

  const expectedPassword = user.password || '123456';
  if (password !== expectedPassword) {
    showAuthAlert('error', 'Senha incorreta para este e-mail. (Dica de teste demo: utilize a senha 123456)');
    return;
  }

  // Autenticação bem-sucedida
  appState.currentUser = { ...user };
  saveState();
  renderAppNavbar();
  triggerConfetti();
  showToast(`Bem-vindo(a) de volta, ${user.name}!`);
  switchView('explorar');
}

// Submissão do Formulário de Cadastro (RF01)
function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim().toLowerCase();
  const password = document.getElementById('reg-password')?.value;
  const confirmPassword = document.getElementById('reg-confirm-password')?.value;
  const skillTeach = document.getElementById('reg-skill-teach')?.value.trim();
  const skillLearn = document.getElementById('reg-skill-learn')?.value.trim();
  const termsChecked = document.getElementById('reg-terms')?.checked;

  if (!name || !email || !password || !confirmPassword) {
    showAuthAlert('error', 'Por favor, preencha todos os campos obrigatórios (*).');
    return;
  }

  if (!termsChecked) {
    showAuthAlert('error', 'Você deve aceitar os termos de uso e o princípio da Moeda Zero para continuar.');
    return;
  }

  if (password.length < 6) {
    showAuthAlert('error', 'A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  if (password !== confirmPassword) {
    showAuthAlert('error', 'As senhas digitadas não coincidem. Digite a mesma senha nos dois campos.');
    return;
  }

  if (appState.users.some(u => u.email.toLowerCase() === email)) {
    showAuthAlert('error', 'Este e-mail já está cadastrado no SkillSwap. Alterne para a aba Entrar (Login).');
    return;
  }

  // Criação do novo perfil de usuário com bônus de boas-vindas (+50 XP)
  const newUserId = 'user-' + Date.now();
  const newUser = {
    id: newUserId,
    name: name,
    email: email,
    password: password,
    role: 'USER',
    xp: 50, // Bônus de boas-vindas RF01
    level: 1,
    streakDays: 1,
    isVerified: false,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: `Novo participante da rede SkillSwap. Compartilhando ${skillTeach || 'conhecimentos práticos'} e aprendendo ${skillLearn || 'novas competências'}.`,
    location: 'São Paulo, SP',
    availability: ['noite', 'finais_de_semana'],
    phone: '',
    linkedin: '',
    github: '',
    rating: 5.0,
    reviewsCount: 0,
    skillsTeaching: skillTeach ? [
      { id: 'sk-' + Date.now(), name: skillTeach, proficiency: 'INTERMEDIATE', category: 'Geral' }
    ] : [],
    skillsLearning: skillLearn ? [
      { id: 'sk-l-' + Date.now(), name: skillLearn, targetGoal: 'Aprender na prática', category: 'Geral' }
    ] : []
  };

  appState.users.unshift(newUser);
  appState.currentUser = { ...newUser };

  if (!appState.notifications) appState.notifications = [];
  appState.notifications.unshift({
    id: 'notif-' + Date.now(),
    title: 'Boas-vindas ao SkillSwap! 🎉',
    message: 'Sua conta foi criada com sucesso! Você ganhou 50 XP de bônus inicial.',
    isRead: false,
    link: '#conquistas',
    createdAt: new Date().toISOString()
  });

  saveState();
  renderAppNavbar();
  triggerConfetti();
  showToast('Conta criada com sucesso! +50 XP de Boas-vindas concedidos 🚀');
  switchView('explorar');
}

// Logout do usuário
function handleLogout() {
  appState.currentUser = null;
  saveState();
  renderAppNavbar();
  switchView('auth', { mode: 'login' });
  showToast('Você encerrou sua sessão com sucesso.');
}

// Modal de Recuperação de Senha (RF03)
function openForgotPasswordModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl relative">
        <button onclick="closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4">
          <i data-lucide="key-round" class="w-6 h-6"></i>
        </div>

        <h3 class="text-xl font-bold text-white tracking-tight">Recuperar Senha</h3>
        <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Informe seu e-mail cadastrado. Enviaremos um link seguro com token criptográfico de uso único para redefinição da sua senha (RF03).
        </p>

        <form onsubmit="handleForgotPasswordSubmit(event)" class="mt-5 space-y-4">
          <div>
            <label for="reset-email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Seu E-mail Cadastrado
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <i data-lucide="mail" class="w-4 h-4"></i>
              </div>
              <input 
                type="email" 
                id="reset-email" 
                required 
                placeholder="seu.email@exemplo.com" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
            </div>
          </div>

          <div id="reset-alert" class="hidden p-3 rounded-xl text-xs font-medium"></div>

          <div class="flex items-center gap-3 pt-2">
            <button type="button" onclick="closeModal()" class="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              Enviar Link
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function handleForgotPasswordSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('reset-email');
  const alertEl = document.getElementById('reset-alert');
  if (!emailInput || !alertEl) return;

  const email = emailInput.value.trim();
  alertEl.className = 'p-3 rounded-xl text-xs font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2';
  alertEl.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 shrink-0"></i> <span>Se o e-mail <strong>${email}</strong> constar em nossa base, as instruções para redefinição foram enviadas com sucesso!</span>`;
  alertEl.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    closeModal();
    showToast('Instruções de recuperação enviadas para o seu e-mail!');
  }, 2200);
}

// ----------------- VIEW 1: EXPLORAR & IA MATCH (RF07, RF08) -----------------
function renderExplorarView(container) {
  const currentUser = appState.currentUser;
  
  // Calculate match score for all candidates
  const candidates = appState.users
    .filter(u => u.id !== currentUser.id && u.role === 'USER')
    .map(u => {
      const match = calculateMatchScore(currentUser, u);
      return { ...u, match };
    })
    .sort((a, b) => b.match.total - a.match.total);

  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Hero Banner & IA Match Highlight -->
      <div class="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 shadow-2xl">
        <div class="absolute -right-12 -top-12 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div class="absolute right-40 -bottom-10 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        
        <div class="max-w-3xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-400"></i>
            Algoritmo Inteligente de Compatibilidade Ativo (IA Match 2.0)
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Aprenda sem pagar nada.<br>
            <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Troque conhecimento bilateralmente.
            </span>
          </h1>
          <p class="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            O algoritmo cruza em tempo real o que você ensina com o que os membros buscam aprender, calculando afinidade mútua de 0 a 100% com base em 6 vetores de compatibilidade.
          </p>

          <!-- Search & Filter Controls -->
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="candidate-search-input" oninput="filterCandidates()" placeholder="Buscar por competência (ex: Figma, React, Inglês, Python)..." 
                class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500">
            </div>
            <select id="candidate-category-select" onchange="filterCandidates()" class="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-blue-500">
              <option value="ALL">Todas as Categorias</option>
              <option value="Tecnologia">Tecnologia & Dev</option>
              <option value="Design">Design & UI/UX</option>
              <option value="Idiomas">Idiomas</option>
              <option value="Áudio & Vídeo">Áudio & Vídeo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Match Score Formula Explainer Card -->
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-2">
          <i data-lucide="cpu" class="w-4 h-4 text-indigo-400"></i>
          <span class="font-bold text-slate-300">Como o IA Match é calculado:</span>
        </div>
        <div class="flex flex-wrap gap-2 text-slate-400">
          <span class="px-2 py-1 rounded bg-slate-800 text-blue-300">Habilidades Recíprocas: 50%</span>
          <span class="px-2 py-1 rounded bg-slate-800 text-amber-300">Reputação: 20%</span>
          <span class="px-2 py-1 rounded bg-slate-800 text-emerald-300">Horários: 15%</span>
          <span class="px-2 py-1 rounded bg-slate-800 text-purple-300">Categorias: 10%</span>
          <span class="px-2 py-1 rounded bg-slate-800 text-cyan-300">Localização: 5%</span>
          <span class="px-2 py-1 rounded bg-slate-800 text-rose-300">Verificado: +5%</span>
        </div>
      </div>

      <!-- Candidate Cards Grid -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <i data-lucide="users" class="w-5 h-5 text-blue-400"></i>
            Parceiros Recomendados para Você (${candidates.length})
          </h2>
          <span class="text-xs text-slate-400">Ordenado pelo maior índice de compatibilidade</span>
        </div>

        <div id="candidates-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${candidates.map(candidate => renderCandidateCard(candidate)).join('')}
        </div>
      </div>

    </div>
  `;
}

function renderCandidateCard(candidate) {
  const match = candidate.match;
  const isHighMatch = match.total >= 80;
  
  return `
    <div class="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
      
      <!-- Match badge -->
      <div class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isHighMatch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 badge-glow' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}">
        <i data-lucide="zap" class="w-3.5 h-3.5 fill-current"></i>
        <span class="font-extrabold text-xs tracking-tight">${match.total}% MATCH</span>
      </div>

      <div>
        <!-- Profile Header -->
        <div class="flex items-start gap-4">
          <img src="${candidate.avatar}" alt="${candidate.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-md">
          <div class="pr-20">
            <div class="flex items-center gap-1.5">
              <h3 class="font-bold text-white text-base group-hover:text-blue-400 transition-colors">${candidate.name}</h3>
              ${candidate.isVerified ? `
                <span title="Instrutor Verificado por Certificado" class="text-blue-400">
                  <i data-lucide="badge-check" class="w-4 h-4 fill-blue-500/20"></i>
                </span>
              ` : ''}
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span class="flex items-center text-amber-400 font-semibold gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${candidate.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>${candidate.location}</span>
            </div>
          </div>
        </div>

        <!-- Bio snippet -->
        <p class="text-slate-300 text-xs mt-3 line-clamp-2 leading-relaxed">
          ${candidate.bio}
        </p>

        <!-- Match Type summary -->
        <div class="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-indigo-300 flex items-center gap-1.5">
          <i data-lucide="sparkles" class="w-3 h-3 text-indigo-400 shrink-0"></i>
          <span class="truncate">${match.matchType}</span>
        </div>

        <!-- Skills Section -->
        <div class="mt-4 space-y-2.5">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <i data-lucide="graduation-cap" class="w-3 h-3"></i> Pode te ensinar:
            </span>
            <div class="flex flex-wrap gap-1.5 mt-1">
              ${candidate.skillsTeaching.map(s => `
                <span class="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                  ${s.name}
                </span>
              `).join('')}
            </div>
          </div>

          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
              <i data-lucide="book-open" class="w-3 h-3"></i> Quer aprender com você:
            </span>
            <div class="flex flex-wrap gap-1.5 mt-1">
              ${candidate.skillsLearning.map(s => `
                <span class="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 font-medium">
                  ${s.name}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
        <button onclick="openProposalModal('${candidate.id}')" class="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5">
          <i data-lucide="repeat" class="w-3.5 h-3.5"></i> Propor Troca
        </button>
        <button onclick="openMatchDetailModal('${candidate.id}')" title="Ver Raio-X do Match" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
          <i data-lucide="info" class="w-4 h-4"></i>
        </button>
      </div>

    </div>
  `;
}

function filterCandidates() {
  const search = document.getElementById('candidate-search-input')?.value.toLowerCase() || '';
  const category = document.getElementById('candidate-category-select')?.value || 'ALL';

  const currentUser = appState.currentUser;
  const filtered = appState.users
    .filter(u => u.id !== currentUser.id && u.role === 'USER')
    .filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search) ||
        u.skillsTeaching.some(s => s.name.toLowerCase().includes(search)) ||
        u.skillsLearning.some(s => s.name.toLowerCase().includes(search));
      
      const matchCat = category === 'ALL' ||
        u.skillsTeaching.some(s => s.category === category) ||
        u.skillsLearning.some(s => s.category === category);

      return matchSearch && matchCat;
    })
    .map(u => ({ ...u, match: calculateMatchScore(currentUser, u) }))
    .sort((a, b) => b.match.total - a.match.total);

  const container = document.getElementById('candidates-grid');
  if (container) {
    container.innerHTML = filtered.map(c => renderCandidateCard(c)).join('');
    if (window.lucide) window.lucide.createIcons();
  }
}

// ----------------- VIEW 2: MINHAS TROCAS (RF09, RF10) -----------------
function renderTrocasView(container) {
  const currentUser = appState.currentUser;
  const myExchanges = appState.exchanges.filter(e => e.requesterId === currentUser.id || e.receiverId === currentUser.id);

  const pending = myExchanges.filter(e => e.status === 'PENDING');
  const active = myExchanges.filter(e => e.status === 'ACCEPTED');
  const completed = myExchanges.filter(e => e.status === 'COMPLETED');

  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 class="text-2xl font-bold text-white flex items-center gap-2">
            <i data-lucide="repeat" class="w-6 h-6 text-blue-400"></i>
            Painel de Trocas Recíprocas
          </h1>
          <p class="text-slate-400 text-xs mt-1">Gerencie suas propostas de permuta, aprovações e transições de status.</p>
        </div>
        <button onclick="switchView('explorar')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-500/20">
          <i data-lucide="plus" class="w-4 h-4"></i> Encontrar Novo Parceiro
        </button>
      </div>

      <!-- Stats Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-amber-300">Pendentes</span>
            <i data-lucide="clock" class="w-4 h-4 text-amber-400"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-2">${pending.length}</p>
        </div>
        <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-emerald-300">Ativas (Aceitas)</span>
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-2">${active.length}</p>
        </div>
        <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-indigo-300">Concluídas com Sucesso</span>
            <i data-lucide="award" class="w-4 h-4 text-indigo-400"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-2">${completed.length}</p>
        </div>
      </div>

      <!-- Exchanges List -->
      <div class="space-y-4">
        ${myExchanges.length === 0 ? `
          <div class="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
            <i data-lucide="inbox" class="w-12 h-12 text-slate-600 mx-auto mb-3"></i>
            <h3 class="text-white font-bold text-base">Nenhuma troca registrada ainda</h3>
            <p class="text-slate-400 text-xs mt-1">Vá até o menu Explorar para descobrir parceiros e enviar sua primeira proposta!</p>
          </div>
        ` : myExchanges.map(exc => renderExchangeItem(exc, currentUser)).join('')}
      </div>

    </div>
  `;
}

function renderExchangeItem(exchange, currentUser) {
  const isRequester = exchange.requesterId === currentUser.id;
  const partnerId = isRequester ? exchange.receiverId : exchange.requesterId;
  const partner = appState.users.find(u => u.id === partnerId) || { name: 'Membro SkillSwap', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' };

  const statusColors = {
    PENDING: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    ACCEPTED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    COMPLETED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    REJECTED: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  };

  const statusLabels = {
    PENDING: 'Aguardando Resposta',
    ACCEPTED: 'Em Andamento (Aceita)',
    COMPLETED: 'Troca Concluída',
    REJECTED: 'Recusada'
  };

  return `
    <div class="glass-card rounded-2xl p-5 border border-slate-800 transition-all">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Partner & Info -->
        <div class="flex items-start gap-4">
          <img src="${partner.avatar}" alt="${partner.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-white text-sm">${partner.name}</h3>
              <span class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${statusColors[exchange.status]}">
                ${statusLabels[exchange.status]}
              </span>
              ${isRequester ? '<span class="text-[10px] text-slate-500">(Você propôs)</span>' : '<span class="text-[10px] text-blue-400 font-semibold">(Proposta recebida)</span>'}
            </div>

            <!-- Skills Swapped -->
            <div class="flex items-center gap-2 text-xs mt-2 text-slate-300">
              <span class="px-2 py-1 rounded bg-slate-800 font-medium text-emerald-300 border border-emerald-500/30">
                Ofertada: ${exchange.offeredSkill}
              </span>
              <i data-lucide="arrow-left-right" class="w-3.5 h-3.5 text-slate-500"></i>
              <span class="px-2 py-1 rounded bg-slate-800 font-medium text-blue-300 border border-blue-500/30">
                Desejada: ${exchange.desiredSkill}
              </span>
            </div>

            <p class="text-slate-400 text-xs mt-2 italic bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
              "${exchange.proposalNote}"
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap md:flex-col items-end gap-2 shrink-0">
          ${exchange.status === 'PENDING' && !isRequester ? `
            <div class="flex gap-2">
              <button onclick="acceptExchange('${exchange.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
                <i data-lucide="check" class="w-3.5 h-3.5"></i> Aceitar (+20 XP)
              </button>
              <button onclick="rejectExchange('${exchange.id}')" class="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold text-xs border border-rose-500/30">
                Recusar
              </button>
            </div>
          ` : ''}

          ${exchange.status === 'ACCEPTED' ? `
            <div class="flex flex-wrap gap-2">
              <button onclick="switchView('chat', { partnerId: '${partnerId}' })" class="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs border border-blue-500/30 flex items-center gap-1.5">
                <i data-lucide="message-square" class="w-3.5 h-3.5"></i> Conversar
              </button>
              <button onclick="openScheduleClassModal('${exchange.id}', '${partnerId}')" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i> Agendar Aula
              </button>
              <button onclick="openReviewModal('${exchange.id}', '${partnerId}')" class="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs border border-emerald-500/30 flex items-center gap-1.5">
                <i data-lucide="star" class="w-3.5 h-3.5"></i> Concluir & Avaliar
              </button>
            </div>
          ` : ''}

          ${exchange.status === 'COMPLETED' ? `
            <button onclick="switchView('certificado', { code: 'SKILL-9F8A-42E1-BC77' })" class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center gap-1.5">
              <i data-lucide="award" class="w-3.5 h-3.5"></i> Ver Certificado Emitido
            </button>
          ` : ''}
        </div>

      </div>
    </div>
  `;
}

function acceptExchange(exchangeId) {
  const exc = appState.exchanges.find(e => e.id === exchangeId);
  if (!exc) return;
  exc.status = 'ACCEPTED';
  exc.acceptedAt = new Date().toISOString();
  saveState();
  addXP(20, 'Aceitou Proposta de Permuta');
  showToast('Proposta de troca aceita com sucesso! Vocês já podem alinhar no chat e agendar aulas.', 'info');
  switchView('trocas');
}

function rejectExchange(exchangeId) {
  const exc = appState.exchanges.find(e => e.id === exchangeId);
  if (!exc) return;
  exc.status = 'REJECTED';
  saveState();
  showToast('Proposta recusada.', 'info');
  switchView('trocas');
}

// ----------------- VIEW 3: CHAT INTEGRADO (RF11) -----------------
function renderChatView(container, activePartnerId = null) {
  const currentUser = appState.currentUser;
  
  // Find partners with whom user has active exchanges
  const partners = appState.users.filter(u => 
    u.id !== currentUser.id && 
    appState.exchanges.some(e => 
      (e.requesterId === currentUser.id && e.receiverId === u.id) || 
      (e.receiverId === currentUser.id && e.requesterId === u.id)
    )
  );

  const selectedPartner = partners.find(p => p.id === activePartnerId) || partners[0] || appState.users.find(u => u.id === 'user-2');

  const filteredMessages = appState.messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === selectedPartner.id) ||
    (m.senderId === selectedPartner.id && m.receiverId === currentUser.id)
  );

  container.innerHTML = `
    <div class="h-[calc(100vh-140px)] min-h-[500px] rounded-3xl glass-panel border border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fadeIn">
      
      <!-- Channels / Partners Sidebar (Discord Style) -->
      <div class="w-full md:w-80 bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 class="font-bold text-white text-sm flex items-center gap-2">
              <i data-lucide="message-square" class="w-4 h-4 text-blue-400"></i>
              Canais Diretos
            </h2>
            <span class="text-[10px] text-slate-500 font-mono">P2P Encrypted</span>
          </div>

          <div class="mt-3 space-y-1">
            ${partners.map(p => `
              <div onclick="switchView('chat', { partnerId: '${p.id}' })" class="p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${p.id === selectedPartner.id ? 'bg-blue-600/20 text-white border border-blue-500/30' : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'}">
                <div class="relative">
                  <img src="${p.avatar}" alt="${p.name}" class="w-10 h-10 rounded-full object-cover">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-slate-950"></span>
                </div>
                <div class="overflow-hidden flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-xs truncate text-white">${p.name}</span>
                    <span class="text-[9px] text-slate-500">Online</span>
                  </div>
                  <p class="text-[11px] text-slate-400 truncate mt-0.5">Clique para abrir mensagens</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick tips -->
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
          <p class="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> Dica de Segurança
          </p>
          Nunca realize ou aceite pagamentos monetários. O SkillSwap é 100% gratuito por permuta.
        </div>
      </div>

      <!-- Active Chat Main Area -->
      <div class="flex-1 flex flex-col justify-between bg-slate-900/40">
        
        <!-- Header -->
        <div class="p-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="${selectedPartner.avatar}" alt="${selectedPartner.name}" class="w-10 h-10 rounded-full object-cover border border-slate-700">
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="font-bold text-white text-sm">${selectedPartner.name}</h3>
                ${selectedPartner.isVerified ? '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-blue-400"></i>' : ''}
              </div>
              <span class="text-[11px] text-emerald-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Disponível para Aula
              </span>
            </div>
          </div>

          <!-- Quick Actions: Video Call & Schedule -->
          <div class="flex items-center gap-2">
            <button onclick="openScheduleClassModal('exc-1', '${selectedPartner.id}')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-blue-400"></i> Agendar Aula
            </button>
            <button onclick="switchView('aula', { roomId: 'room-${selectedPartner.id}' })" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
              <i data-lucide="video" class="w-3.5 h-3.5"></i> Entrar na Sala WebRTC
            </button>
          </div>
        </div>

        <!-- Messages Bubble Stream -->
        <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3">
          ${filteredMessages.map(m => {
            const isMe = m.senderId === currentUser.id;
            return `
              <div class="flex ${isMe ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${isMe ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/10' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'}">
                  <p>${m.content}</p>
                  <span class="block text-[9px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}">
                    ${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Chat Input Bar -->
        <div class="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <form onsubmit="handleSendChatMessage(event, '${selectedPartner.id}')" class="flex items-center gap-2">
            <input type="text" id="chat-input-field" placeholder="Escreva sua mensagem para ${selectedPartner.name}..." 
              class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500">
            <button type="submit" class="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20">
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>
        </div>

      </div>

    </div>
  `;

  // Scroll to bottom
  setTimeout(() => {
    const el = document.getElementById('chat-messages-container');
    if (el) el.scrollTop = el.scrollHeight;
  }, 50);
}

function handleSendChatMessage(event, partnerId) {
  event.preventDefault();
  const input = document.getElementById('chat-input-field');
  const text = input?.value.trim();
  if (!text) return;

  appState.messages.push({
    id: 'msg-' + Date.now(),
    senderId: appState.currentUser.id,
    receiverId: partnerId,
    content: text,
    timestamp: new Date().toISOString()
  });

  input.value = '';
  saveState();
  addXP(5, 'Mensagem enviada');
  renderChatView(document.getElementById('main-content'), partnerId);
  if (window.lucide) window.lucide.createIcons();
}

// ----------------- VIEW 4: SALA DE VIDEOCHAMADA WEBRTC (RF12) -----------------
let localMediaStream = null;
let isAudioMuted = false;
let isVideoDisabled = false;
let isScreenSharing = false;
let classTimerInterval = null;
let classSecondsElapsed = 0;

function renderAulaVideoView(container, roomId) {
  container.innerHTML = `
    <div class="space-y-4 animate-fadeIn">
      
      <!-- Video Room Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <i data-lucide="video" class="w-5 h-5"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white flex items-center gap-2">
              Sala de Aula WebRTC P2P
              <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold animate-pulse">
                AO VIVO
              </span>
            </h1>
            <p class="text-slate-400 text-xs">ID da Sala: <span class="font-mono text-blue-400">${roomId || 'skillswap-mesh-room'}</span></p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Class Timer -->
          <div class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-amber-400"></i>
            <span id="class-timer-display">00:00</span>
          </div>

          <!-- Exit Room Button -->
          <button onclick="leaveVideoRoom()" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/30">
            <i data-lucide="phone-off" class="w-4 h-4"></i> Encerrar Aula
          </button>
        </div>
      </div>

      <!-- Video Grid (Discord Style) -->
      <div class="video-grid min-h-[460px]">
        
        <!-- Remote Participant (Mentor/Partner) -->
        <div class="video-container relative group">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" 
            alt="Carlos Mendes" class="w-full h-full object-cover">
          
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

          <!-- Audio Wave Indicator -->
          <div class="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
            <div class="flex items-center gap-1">
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
            </div>
            <span class="text-xs font-semibold text-white">Carlos Mendes (Falando)</span>
          </div>

          <div class="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-500/40">
            Conexão P2P Ótima (18ms)
          </div>
        </div>

        <!-- Local Participant (Me) with Real WebRTC Camera Support -->
        <div class="video-container relative bg-slate-950">
          <video id="local-video-element" autoplay playsinline muted class="w-full h-full object-cover"></video>
          
          <div id="local-video-fallback" class="hidden absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400">
            <img src="${appState.currentUser.avatar}" class="w-20 h-20 rounded-full border-2 border-slate-700 mb-2">
            <span class="text-xs font-semibold">${appState.currentUser.name} (Câmera Desativada)</span>
          </div>

          <div class="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span class="text-xs font-semibold text-white">${appState.currentUser.name} (Você)</span>
          </div>
        </div>

      </div>

      <!-- Controls Bar (Discord / Meet Style) -->
      <div class="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-center gap-4">
        
        <button id="toggle-mic-btn" onclick="toggleMicrophone()" class="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 transition-all">
          <i data-lucide="mic" class="w-5 h-5 text-emerald-400"></i>
          <span>Microfone</span>
        </button>

        <button id="toggle-cam-btn" onclick="toggleCamera()" class="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 transition-all">
          <i data-lucide="video" class="w-5 h-5 text-emerald-400"></i>
          <span>Câmera</span>
        </button>

        <button id="toggle-screen-btn" onclick="toggleScreenShare()" class="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 transition-all">
          <i data-lucide="monitor" class="w-5 h-5 text-blue-400"></i>
          <span>Compartilhar Tela</span>
        </button>

        <button onclick="leaveVideoRoom()" class="p-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-rose-600/30">
          <i data-lucide="phone-off" class="w-5 h-5"></i>
          <span>Finalizar Sessão</span>
        </button>

      </div>

    </div>
  `;

  // Start WebRTC camera stream
  startWebRTCCamera();

  // Start Class Timer
  startClassTimer();
}

async function startWebRTCCamera() {
  const videoEl = document.getElementById('local-video-element');
  const fallbackEl = document.getElementById('local-video-fallback');

  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoEl) {
        videoEl.srcObject = localMediaStream;
      }
    } else {
      if (fallbackEl) fallbackEl.classList.remove('hidden');
    }
  } catch (err) {
    console.warn('Câmera não permitida ou indisponível, usando fallback visual:', err);
    if (fallbackEl) fallbackEl.classList.remove('hidden');
    if (videoEl) videoEl.classList.add('hidden');
  }
}

function toggleMicrophone() {
  isAudioMuted = !isAudioMuted;
  if (localMediaStream) {
    localMediaStream.getAudioTracks().forEach(track => track.enabled = !isAudioMuted);
  }
  const btn = document.getElementById('toggle-mic-btn');
  if (btn) {
    btn.className = `p-3.5 rounded-2xl ${isAudioMuted ? 'bg-rose-600/30 text-rose-300 border border-rose-500/50' : 'bg-slate-800 text-white'} font-medium text-xs flex items-center gap-2 transition-all`;
    btn.innerHTML = `<i data-lucide="${isAudioMuted ? 'mic-off' : 'mic'}" class="w-5 h-5 text-${isAudioMuted ? 'rose-400' : 'emerald-400'}"></i> <span>${isAudioMuted ? 'Mudo' : 'Microfone'}</span>`;
    if (window.lucide) window.lucide.createIcons();
  }
}

function toggleCamera() {
  isVideoDisabled = !isVideoDisabled;
  if (localMediaStream) {
    localMediaStream.getVideoTracks().forEach(track => track.enabled = !isVideoDisabled);
  }
  const fallbackEl = document.getElementById('local-video-fallback');
  const videoEl = document.getElementById('local-video-element');
  if (isVideoDisabled) {
    fallbackEl?.classList.remove('hidden');
    videoEl?.classList.add('hidden');
  } else {
    fallbackEl?.classList.add('hidden');
    videoEl?.classList.remove('hidden');
  }
}

async function toggleScreenShare() {
  try {
    if (!isScreenSharing && navigator.mediaDevices.getDisplayMedia) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const videoEl = document.getElementById('local-video-element');
      if (videoEl) videoEl.srcObject = screenStream;
      isScreenSharing = true;
      showToast('Compartilhamento de tela iniciado!');
      screenStream.getVideoTracks()[0].onended = () => {
        isScreenSharing = false;
        if (localMediaStream && videoEl) videoEl.srcObject = localMediaStream;
      };
    } else if (localMediaStream) {
      const videoEl = document.getElementById('local-video-element');
      if (videoEl) videoEl.srcObject = localMediaStream;
      isScreenSharing = false;
    }
  } catch (e) {
    console.warn('Erro ao compartilhar tela', e);
  }
}

function startClassTimer() {
  clearInterval(classTimerInterval);
  classSecondsElapsed = 0;
  classTimerInterval = setInterval(() => {
    classSecondsElapsed++;
    const mins = String(Math.floor(classSecondsElapsed / 60)).padStart(2, '0');
    const secs = String(classSecondsElapsed % 60).padStart(2, '0');
    const el = document.getElementById('class-timer-display');
    if (el) el.innerText = `${mins}:${secs}`;
  }, 1000);
}

function leaveVideoRoom() {
  clearInterval(classTimerInterval);
  if (localMediaStream) {
    localMediaStream.getTracks().forEach(t => t.stop());
    localMediaStream = null;
  }
  addXP(80, 'Aula ao vivo concluída com sucesso');
  openReviewModal('exc-1', 'user-2');
}

// ----------------- VIEW 5: AGENDA DE AULAS (RF13) -----------------
function renderAgendaView(container) {
  const currentUser = appState.currentUser;
  const classes = appState.scheduledClasses;

  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 class="text-2xl font-bold text-white flex items-center gap-2">
            <i data-lucide="calendar" class="w-6 h-6 text-blue-400"></i>
            Agenda de Aulas & Mentorias
          </h1>
          <p class="text-slate-400 text-xs mt-1">Sessões combinadas vinculadas às trocas aceitas.</p>
        </div>
        <button onclick="openScheduleClassModal('exc-1', 'user-2')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md">
          <i data-lucide="plus" class="w-4 h-4"></i> Agendar Nova Aula
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${classes.map(c => {
          const partnerId = c.teacherId === currentUser.id ? c.studentId : c.teacherId;
          const partner = appState.users.find(u => u.id === partnerId) || { name: 'Parceiro', avatar: '' };
          const isTeacher = c.teacherId === currentUser.id;

          return `
            <div class="glass-card rounded-2xl p-6 border border-slate-800 relative">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${isTeacher ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}">
                    ${isTeacher ? 'Você ensina' : 'Você aprende'}
                  </span>
                  <h3 class="text-base font-bold text-white mt-2">${c.title}</h3>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 justify-end">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${c.durationMinutes} min
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <img src="${partner.avatar}" class="w-10 h-10 rounded-full object-cover">
                <div>
                  <p class="text-xs font-semibold text-white">Com: ${partner.name}</p>
                  <p class="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <i data-lucide="calendar-days" class="w-3.5 h-3.5 text-blue-400"></i>
                    ${new Date(c.scheduledAt).toLocaleDateString()} às ${new Date(c.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex items-center gap-2">
                <button onclick="switchView('aula', { roomId: '${c.meetingRoomId}' })" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md">
                  <i data-lucide="video" class="w-3.5 h-3.5"></i> Entrar na Sala Virtual
                </button>
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ----------------- VIEW 6: CONQUISTAS & GAMIFICAÇÃO (RF19) -----------------
function renderConquistasView(container) {
  const user = appState.currentUser;
  const achievements = appState.achievements;
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Gamification Hero Header (Duolingo Style) -->
      <div class="rounded-3xl p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        <div class="max-w-2xl">
          <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <i data-lucide="flame" class="w-4 h-4 fill-emerald-400"></i>
            Progresso de Gamificação & Mérito
          </div>
          <h1 class="text-3xl font-black text-white">
            Nível ${user.level} – Mestre da Colaboração
          </h1>
          <p class="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Cada troca de conhecimento concluída, avaliação 5 estrelas e minuto de mentoria concedem pontos de experiência (XP) que desbloqueiam insígnias e o Certificado Digital de Excelência.
          </p>

          <!-- XP Bar -->
          <div class="mt-6">
            <div class="flex items-center justify-between text-xs font-semibold mb-2">
              <span class="text-emerald-300 flex items-center gap-1">
                <i data-lucide="zap" class="w-4 h-4 fill-emerald-400"></i> ${user.xp} XP Acumulados
              </span>
              <span class="text-slate-400">Próximo Nível: 500 XP</span>
            </div>
            <div class="w-full h-4 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
              <div class="h-full rounded-full xp-progress-bar" style="width: ${Math.min(100, (user.xp / 500) * 100)}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badges Grid -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <i data-lucide="award" class="w-5 h-5 text-amber-400"></i>
            Galeria de Insígnias (${unlockedCount}/${achievements.length} Desbloqueadas)
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${achievements.map(ach => `
            <div class="glass-card rounded-2xl p-5 border ${ach.unlocked ? 'border-amber-500/30 bg-slate-900/80' : 'border-slate-800 opacity-60 bg-slate-950/60'}">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${ach.unlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-500'}">
                  <i data-lucide="${ach.icon}" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold text-sm text-white">${ach.title}</h3>
                    ${ach.unlocked ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">DESBLOQUEADO</span>' : '<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">BLOQUEADO</span>'}
                  </div>
                  <p class="text-xs text-slate-400 mt-1 leading-relaxed">${ach.description}</p>
                  <span class="inline-block mt-3 text-[11px] font-bold text-emerald-400">
                    +${ach.points} XP Recompensa
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action: Emit Certificate -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="text-white font-bold text-base flex items-center gap-2">
            <i data-lucide="file-check" class="w-5 h-5 text-blue-400"></i>
            Emissão de Certificado Digital com Validação Pública
          </h3>
          <p class="text-slate-300 text-xs mt-1">Concluiu suas mentorias? Obtenha o certificado oficial com hash criptográfico.</p>
        </div>
        <button onclick="switchView('certificado', { code: 'SKILL-9F8A-42E1-BC77' })" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25">
          Visualizar Certificado
        </button>
      </div>

    </div>
  `;
}

// ----------------- VIEW 7: PERFIL & HABILIDADES (RF04, RF05, RF06) -----------------
function renderPerfilView(container) {
  const user = appState.currentUser;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      <!-- Profile Header (LinkedIn Style) -->
      <div class="glass-card rounded-3xl overflow-hidden border border-slate-800">
        <div class="h-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900"></div>
        <div class="px-6 pb-6 pt-0 relative">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 gap-4">
            <div class="flex items-end gap-4">
              <img src="${user.avatar}" class="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-xl">
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl font-bold text-white">${user.name}</h1>
                  ${user.isVerified ? '<i data-lucide="check-circle" class="w-5 h-5 text-blue-400"></i>' : ''}
                </div>
                <p class="text-slate-400 text-xs mt-0.5">${user.location} • Avaliação: ⭐ ${user.rating} (${user.reviewsCount} reviews)</p>
              </div>
            </div>
            <button onclick="showToast('Perfil salvo com sucesso!')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md">
              Salvar Alterações
            </button>
          </div>

          <!-- Bio -->
          <div class="mt-6">
            <label class="text-xs font-bold text-slate-300 uppercase tracking-wider">Biografia Profissional</label>
            <textarea id="profile-bio-input" class="w-full mt-2 p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-blue-500" rows="3">${user.bio}</textarea>
          </div>
        </div>
      </div>

      <!-- Skills Management Section (RF05, RF06) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Skills to Teach (RF05) -->
        <div class="glass-card rounded-2xl p-6 border border-slate-800">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="font-bold text-white text-sm flex items-center gap-2">
              <i data-lucide="graduation-cap" class="w-4 h-4 text-emerald-400"></i>
              Habilidades que Ensino (Oferta)
            </h3>
            <span class="text-xs text-emerald-400 font-semibold">${user.skillsTeaching.length} cadastradas</span>
          </div>

          <div class="mt-4 space-y-2">
            ${user.skillsTeaching.map(s => `
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p class="font-bold text-slate-200">${s.name}</p>
                  <span class="text-[10px] text-slate-500 font-mono">${s.proficiency} • ${s.category}</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">Ativa</span>
              </div>
            `).join('')}
          </div>

          <div class="mt-4 pt-4 border-t border-slate-800">
            <div class="flex gap-2">
              <input type="text" id="new-teach-skill" placeholder="Nova habilidade (ex: Docker)..." class="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white">
              <button onclick="handleAddTeachSkill()" class="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <!-- Skills to Learn (RF06) -->
        <div class="glass-card rounded-2xl p-6 border border-slate-800">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="font-bold text-white text-sm flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4 text-blue-400"></i>
              Habilidades que Quero Aprender (Demanda)
            </h3>
            <span class="text-xs text-blue-400 font-semibold">${user.skillsLearning.length} metas</span>
          </div>

          <div class="mt-4 space-y-2">
            ${user.skillsLearning.map(s => `
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p class="font-bold text-slate-200">${s.name}</p>
                  <span class="text-[10px] text-slate-400">${s.targetGoal || s.category}</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">Buscando</span>
              </div>
            `).join('')}
          </div>

          <div class="mt-4 pt-4 border-t border-slate-800">
            <div class="flex gap-2">
              <input type="text" id="new-learn-skill" placeholder="Quero aprender (ex: Rust)..." class="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white">
              <button onclick="handleAddLearnSkill()" class="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">
                Adicionar
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Professional Verification Submission (RF16) -->
      <div class="glass-card rounded-2xl p-6 border border-slate-800">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 class="font-bold text-white text-sm flex items-center gap-2">
              <i data-lucide="badge-check" class="w-4 h-4 text-blue-400"></i>
              Selo de Instrutor Verificado por Diploma/Certificado
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Submeta diplomas ou certificados profissionais para análise da moderação.</p>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${user.isVerified ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-slate-800 text-slate-400'}">
            ${user.isVerified ? 'VERIFICADO PELA EQUIPE' : 'NÃO VERIFICADO'}
          </span>
        </div>

        <div class="mt-4 flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Título profissional ou do diploma (ex: Certificação AWS Solutions Architect)" class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white">
          <button onclick="showToast('Comprovante enviado para análise do Painel Administrativo!', 'info')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">
            Enviar Comprovante
          </button>
        </div>
      </div>

    </div>
  `;
}

function handleAddTeachSkill() {
  const input = document.getElementById('new-teach-skill');
  const name = input?.value.trim();
  if (!name) return;

  appState.currentUser.skillsTeaching.push({
    id: 'sk-' + Date.now(),
    name,
    proficiency: 'ADVANCED',
    category: 'Tecnologia'
  });

  saveState();
  addXP(15, 'Nova competência registrada');
  renderPerfilView(document.getElementById('main-content'));
  if (window.lucide) window.lucide.createIcons();
}

function handleAddLearnSkill() {
  const input = document.getElementById('new-learn-skill');
  const name = input?.value.trim();
  if (!name) return;

  appState.currentUser.skillsLearning.push({
    id: 'sk-' + Date.now(),
    name,
    targetGoal: 'Desenvolver projetos práticos',
    category: 'Tecnologia'
  });

  saveState();
  addXP(15, 'Nova meta de aprendizado');
  renderPerfilView(document.getElementById('main-content'));
  if (window.lucide) window.lucide.createIcons();
}

// ----------------- VIEW 8: PAINEL ADMINISTRATIVO (RF15, RF16, RF17) -----------------
function renderAdminView(container) {
  const verifications = appState.verifications;
  const reports = appState.reports;

  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase border border-rose-500/30">
              Acesso Restrito RBAC (ADMIN)
            </span>
          </div>
          <h1 class="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <i data-lucide="shield-check" class="w-6 h-6 text-rose-400"></i>
            Painel de Controle e Moderação
          </h1>
          <p class="text-slate-400 text-xs">Métricas operacionais, homologação documental e resolução de denúncias da comunidade.</p>
        </div>
      </div>

      <!-- Real-Time Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl glass-card border border-slate-800">
          <span class="text-xs text-slate-400">Membros Registrados</span>
          <p class="text-2xl font-bold text-white mt-1">1.248</p>
          <span class="text-[10px] text-emerald-400 font-semibold">+18% esta semana</span>
        </div>
        <div class="p-4 rounded-2xl glass-card border border-slate-800">
          <span class="text-xs text-slate-400">Trocas Bilaterais Ativas</span>
          <p class="text-2xl font-bold text-blue-400 mt-1">${appState.exchanges.length}</p>
          <span class="text-[10px] text-slate-400">Sem circulação monetária</span>
        </div>
        <div class="p-4 rounded-2xl glass-card border border-slate-800">
          <span class="text-xs text-slate-400">Horas de Mentoria WebRTC</span>
          <p class="text-2xl font-bold text-emerald-400 mt-1">3.490h</p>
          <span class="text-[10px] text-emerald-400 font-semibold">99.8% Uptime P2P</span>
        </div>
        <div class="p-4 rounded-2xl glass-card border border-slate-800">
          <span class="text-xs text-slate-400">Índice de Satisfação</span>
          <p class="text-2xl font-bold text-amber-400 mt-1">4.92 / 5.0</p>
          <span class="text-[10px] text-amber-300 font-semibold">96.4% avaliações 5★</span>
        </div>
      </div>

      <!-- Moderação de Denúncias (RF15) -->
      <div class="glass-card rounded-2xl p-6 border border-slate-800">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-bold text-white text-sm flex items-center gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-400"></i>
            Fila de Denúncias Pendentes (${reports.length})
          </h3>
          <span class="text-xs text-rose-400">Ação Imediata</span>
        </div>

        <div class="mt-4 space-y-3">
          ${reports.map(r => `
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                    ${r.reason}
                  </span>
                  <span class="text-xs font-semibold text-white">Denunciado: ${r.reportedUserName}</span>
                  <span class="text-xs text-slate-500">por ${r.reporterName}</span>
                </div>
                <p class="text-slate-300 text-xs mt-1.5">${r.description}</p>
              </div>
              <div class="flex gap-2">
                <button onclick="resolveReport('${r.id}', 'BAN')" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md">
                  Suspender Usuário
                </button>
                <button onclick="resolveReport('${r.id}', 'DISMISS')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
                  Arquivar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Homologação de Certificados / Diplomas (RF16) -->
      <div class="glass-card rounded-2xl p-6 border border-slate-800">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-bold text-white text-sm flex items-center gap-2">
            <i data-lucide="file-badge" class="w-4 h-4 text-blue-400"></i>
            Homologação Documental para Selo Verificado (${verifications.length})
          </h3>
        </div>

        <div class="mt-4 space-y-3">
          ${verifications.map(v => `
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-white">${v.userName}</span>
                  <span class="text-xs text-blue-400 font-semibold">• ${v.professionTitle}</span>
                </div>
                <p class="text-slate-400 text-xs mt-1">Documento anexado: <span class="font-mono text-slate-300 underline">${v.documentUrl}</span></p>
                <p class="text-slate-500 text-[11px] mt-0.5">${v.notes}</p>
              </div>
              <div class="flex gap-2">
                ${v.status === 'PENDING' ? `
                  <button onclick="approveVerification('${v.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md">
                    Homologar Selo
                  </button>
                  <button onclick="rejectVerification('${v.id}')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">
                    Rejeitar
                  </button>
                ` : `
                  <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    HOMOLOGADO
                  </span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

function resolveReport(reportId, action) {
  appState.reports = appState.reports.filter(r => r.id !== reportId);
  saveState();
  showToast(action === 'BAN' ? 'Usuário infrator suspenso e denúncia resolvida.' : 'Denúncia arquivada.');
  renderAdminView(document.getElementById('main-content'));
  if (window.lucide) window.lucide.createIcons();
}

function approveVerification(verId) {
  const ver = appState.verifications.find(v => v.id === verId);
  if (!ver) return;
  ver.status = 'APPROVED';
  
  // Award verified badge to user
  const u = appState.users.find(user => user.id === ver.userId);
  if (u) u.isVerified = true;

  saveState();
  showToast(`Selo verificado homologado com sucesso para ${ver.userName}!`);
  renderAdminView(document.getElementById('main-content'));
  if (window.lucide) window.lucide.createIcons();
}

function rejectVerification(verId) {
  appState.verifications = appState.verifications.filter(v => v.id !== verId);
  saveState();
  showToast('Comprovante rejeitado com feedback para o solicitante.');
  renderAdminView(document.getElementById('main-content'));
  if (window.lucide) window.lucide.createIcons();
}

// ----------------- VIEW 9: CERTIFICADO PÚBLICO (RF20) -----------------
function renderCertificadoView(container, code = 'SKILL-9F8A-42E1-BC77') {
  const cert = appState.certificates.find(c => c.verificationCode === code) || appState.certificates[0];

  container.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      <!-- Actions Bar -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <button onclick="switchView('conquistas')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1.5">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar
        </button>
        <div class="flex gap-2">
          <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors">
            <i data-lucide="printer" class="w-4 h-4"></i> Imprimir / Salvar PDF
          </button>
          <button onclick="navigator.clipboard.writeText(window.location.href); showToast('Link de validação copiado!')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md">
            <i data-lucide="share-2" class="w-4 h-4"></i> Compartilhar Link
          </button>
        </div>
      </div>

      <!-- Printable Certificate Frame -->
      <div id="printable-certificate" class="certificate-frame rounded-2xl p-10 sm:p-14 text-center">
        
        <div class="flex items-center justify-center gap-2 mb-6">
          <i data-lucide="award" class="w-8 h-8 text-blue-900"></i>
          <span class="font-display font-black text-2xl tracking-wider text-blue-950 uppercase">
            SkillSwap Academy
          </span>
        </div>

        <h2 class="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
          Certificado Oficial de Mentoraria & Permuta Recíproca
        </h2>

        <p class="text-sm text-slate-600 mt-6 font-serif">
          Certificamos com distinção e honra que
        </p>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-blue-950 my-3 font-display">
          ${cert.userName}
        </h1>

        <p class="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
          completou com excelência pedagógica a carga horária de <strong class="text-blue-900 font-bold">${cert.hoursCompleted} horas</strong> de capacitação prática bilateral em:
        </p>

        <div class="my-4 py-2 px-6 inline-block rounded-xl bg-blue-50 border border-blue-200">
          <span class="text-lg font-bold text-blue-900">${cert.skillName}</span>
        </div>

        <p class="text-xs text-slate-500 max-w-md mx-auto">
          sob mentoria direta de <strong class="text-slate-800">${cert.mentorName}</strong>, através da plataforma comunitária de permuta simétrica de saberes.
        </p>

        <!-- Certificate Footer with Seal & Hash -->
        <div class="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div class="text-left">
            <span class="text-[10px] uppercase font-bold text-slate-400">Código Único de Validação Pública</span>
            <p class="font-mono text-sm font-bold text-blue-900 tracking-wider">${cert.verificationCode}</p>
            <span class="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <i data-lucide="shield-check" class="w-3 h-3"></i> Autenticidade Registrada em Ledger
            </span>
          </div>

          <!-- Decorative Gold Seal -->
          <div class="w-16 h-16 rounded-full certificate-seal flex flex-col items-center justify-center text-white border-2 border-amber-200">
            <i data-lucide="check" class="w-5 h-5 stroke-[3]"></i>
            <span class="text-[8px] font-black uppercase">OFICIAL</span>
          </div>

          <div class="text-right">
            <span class="text-[10px] uppercase font-bold text-slate-400">Data de Emissão</span>
            <p class="text-xs font-semibold text-slate-800">${new Date(cert.issuedAt).toLocaleDateString()}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">SkillSwap Foundation</p>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ----------------- MODALS (PROPOSAL, MATCH DETAIL, REVIEW, SCHEDULE) -----------------
function openProposalModal(candidateId) {
  const candidate = appState.users.find(u => u.id === candidateId);
  const currentUser = appState.currentUser;
  if (!candidate) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="glass-dropdown rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 shadow-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="font-bold text-white text-base flex items-center gap-2">
              <i data-lucide="repeat" class="w-5 h-5 text-blue-400"></i>
              Propor Troca Bilateral
            </h3>
            <p class="text-xs text-slate-400">Com ${candidate.name}</p>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white p-1 rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="handleSendProposal(event, '${candidate.id}')" class="space-y-4 mt-4">
          
          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              O que você OFERECE para ensinar:
            </label>
            <select id="proposal-offer-select" class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500">
              ${currentUser.skillsTeaching.map(s => `<option value="${s.name}">${s.name} (${s.proficiency})</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              O que você DESEJA aprender com ${candidate.name}:
            </label>
            <select id="proposal-desire-select" class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500">
              ${candidate.skillsTeaching.map(s => `<option value="${s.name}">${s.name} (${s.proficiency})</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nota explicativa / Proposta de horários:
            </label>
            <textarea id="proposal-note-text" required rows="3" class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-blue-500" placeholder="Olá! Adoraria trocar 1 hora semanal com você. Tenho disponibilidade à noite..."></textarea>
          </div>

          <div class="pt-3 border-t border-slate-800 flex justify-end gap-3">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20">
              Enviar Proposta
            </button>
          </div>

        </form>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function handleSendProposal(event, candidateId) {
  event.preventDefault();
  const offered = document.getElementById('proposal-offer-select')?.value;
  const desired = document.getElementById('proposal-desire-select')?.value;
  const note = document.getElementById('proposal-note-text')?.value;

  appState.exchanges.unshift({
    id: 'exc-' + Date.now(),
    requesterId: appState.currentUser.id,
    receiverId: candidateId,
    offeredSkill: offered,
    desiredSkill: desired,
    proposalNote: note,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    classesCount: 0
  });

  saveState();
  addXP(25, 'Proposta de troca enviada');
  closeModal();
  showToast('Proposta de troca enviada com sucesso!');
  switchView('trocas');
}

function openMatchDetailModal(candidateId) {
  const candidate = appState.users.find(u => u.id === candidateId);
  const currentUser = appState.currentUser;
  if (!candidate) return;

  const match = calculateMatchScore(currentUser, candidate);
  const b = match.breakdown;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="glass-dropdown rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700 shadow-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
              ${match.total}%
            </div>
            <div>
              <h3 class="font-bold text-white text-sm">Raio-X de Compatibilidade</h3>
              <p class="text-xs text-slate-400">Com ${candidate.name}</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white p-1 rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="mt-4 space-y-3 text-xs">
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Permuta Bilateral de Habilidades (máx 50)</span>
            <span class="font-bold text-blue-400">+${b.skills} pts</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Reputação na Comunidade (máx 20)</span>
            <span class="font-bold text-amber-400">+${b.reputation} pts</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Harmonia de Horários (máx 15)</span>
            <span class="font-bold text-emerald-400">+${b.availability} pts</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Afinidade de Categorias (máx 10)</span>
            <span class="font-bold text-purple-400">+${b.categories} pts</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Proximidade Geográfica (máx 5)</span>
            <span class="font-bold text-cyan-400">+${b.location} pts</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
            <span class="text-slate-300">Bônus Selo Verificado (máx 5)</span>
            <span class="font-bold text-rose-400">+${b.verified} pts</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button onclick="closeModal(); openProposalModal('${candidate.id}')" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md">
            Propor Troca com este Parceiro
          </button>
        </div>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function openScheduleClassModal(exchangeId, partnerId) {
  const partner = appState.users.find(u => u.id === partnerId);
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="glass-dropdown rounded-3xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-bold text-white text-sm flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-blue-400"></i>
            Agendar Sessão de Mentoria
          </h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white p-1">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form onsubmit="handleScheduleClass(event, '${exchangeId}', '${partnerId}')" class="space-y-3 mt-4 text-xs">
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Título da Aula</label>
            <input type="text" id="class-title-input" required placeholder="Ex: Prática de Auto-Layout & Componentes" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 uppercase mb-1">Data</label>
              <input type="date" id="class-date-input" required value="2026-10-24" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
            </div>
            <div>
              <label class="block font-bold text-slate-300 uppercase mb-1">Horário</label>
              <input type="time" id="class-time-input" required value="19:00" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Duração</label>
            <select id="class-duration-select" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
              <option value="45">45 minutos</option>
              <option value="60" selected>60 minutos (1 hora)</option>
              <option value="90">90 minutos (1h 30m)</option>
            </select>
          </div>
          <div class="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-3 py-2 rounded-xl bg-slate-800 text-slate-300">Cancelar</button>
            <button type="submit" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">Confirmar Agendamento</button>
          </div>
        </form>

      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function handleScheduleClass(event, exchangeId, partnerId) {
  event.preventDefault();
  const title = document.getElementById('class-title-input')?.value;
  const date = document.getElementById('class-date-input')?.value;
  const time = document.getElementById('class-time-input')?.value;
  const duration = parseInt(document.getElementById('class-duration-select')?.value || '60');

  appState.scheduledClasses.push({
    id: 'class-' + Date.now(),
    exchangeId,
    teacherId: appState.currentUser.id,
    studentId: partnerId,
    title,
    scheduledAt: `${date}T${time}:00`,
    durationMinutes: duration,
    status: 'SCHEDULED',
    meetingRoomId: 'room-' + Date.now()
  });

  saveState();
  addXP(30, 'Aula agendada com parceiro');
  closeModal();
  showToast('Aula agendada com sucesso! Link da sala virtual gerado.');
  switchView('agenda');
}

function openReviewModal(exchangeId, partnerId) {
  const partner = appState.users.find(u => u.id === partnerId) || { name: 'Parceiro' };
  let selectedRating = 5;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div class="glass-dropdown rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700 shadow-2xl">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-bold text-white text-base flex items-center gap-2">
            <i data-lucide="star" class="w-5 h-5 text-amber-400"></i>
            Avaliar Experiência com ${partner.name}
          </h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white p-1">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form onsubmit="handleSubmitReview(event, '${exchangeId}', '${partnerId}')" class="space-y-4 mt-4 text-xs">
          <div class="text-center py-3">
            <label class="block font-bold text-slate-300 uppercase mb-2">Quantas estrelas você atribui?</label>
            <div class="flex items-center justify-center gap-2 text-2xl">
              <span class="cursor-pointer text-amber-400" onclick="setRating(1)">★</span>
              <span class="cursor-pointer text-amber-400" onclick="setRating(2)">★</span>
              <span class="cursor-pointer text-amber-400" onclick="setRating(3)">★</span>
              <span class="cursor-pointer text-amber-400" onclick="setRating(4)">★</span>
              <span class="cursor-pointer text-amber-400" onclick="setRating(5)">★</span>
            </div>
            <p class="text-slate-400 text-[11px] mt-1" id="rating-label">Nota 5 - Excelente mentoria e didática</p>
          </div>

          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Comentário público de feedback:</label>
            <textarea id="review-comment-input" required rows="3" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white" placeholder="O que achou da didática, pontualidade e conhecimento do parceiro?"></textarea>
          </div>

          <div class="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-3 py-2 rounded-xl bg-slate-800 text-slate-300">Pular</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md">
              Enviar Avaliação (+40 XP)
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function setRating(val) {
  // Simple visual update
  const label = document.getElementById('rating-label');
  if (label) label.innerText = `Nota ${val} de 5 estrelas`;
}

function handleSubmitReview(event, exchangeId, partnerId) {
  event.preventDefault();
  const comment = document.getElementById('review-comment-input')?.value;

  appState.reviews.push({
    id: 'rev-' + Date.now(),
    exchangeId,
    reviewerId: appState.currentUser.id,
    reviewedUserId: partnerId,
    rating: 5,
    comment,
    createdAt: new Date().toISOString()
  });

  // Mark exchange as completed
  const exc = appState.exchanges.find(e => e.id === exchangeId);
  if (exc) exc.status = 'COMPLETED';

  saveState();
  addXP(40, 'Avaliação de mentoria enviada');
  closeModal();
  showToast('Avaliação registrada com sucesso! +40 XP concedidos.');
  switchView('trocas');
}

function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

// ----------------- APPLICATION BOOTSTRAP -----------------
window.addEventListener('DOMContentLoaded', () => {
  renderAppNavbar();
  
  // Read hash route or default to explorar (or auth if user not logged in)
  let hash = window.location.hash.replace('#', '');
  if (!hash) {
    hash = appState.currentUser ? 'explorar' : 'auth';
  }
  switchView(hash);

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#user-menu-btn') && !e.target.closest('#user-dropdown')) {
      document.getElementById('user-dropdown')?.classList.add('hidden');
    }
    if (!e.target.closest('#notif-toggle-btn') && !e.target.closest('#notif-dropdown')) {
      document.getElementById('notif-dropdown')?.classList.add('hidden');
    }
  });
});
