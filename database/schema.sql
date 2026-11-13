-- ==============================================================================
-- PROJETO: SkillSwap — Plataforma Colaborativa de Troca de Conhecimentos
-- ARQUIVO: database/schema.sql
-- COMPATIBILIDADE: MySQL 8.0+ / MariaDB 10.4+ (XAMPP / phpMyAdmin / Docker)
-- PADRÃO DE CARACTERES: UTF-8 (utf8mb4_unicode_ci)
-- METODOLOGIA: Spec-Driven Development (SDD)
-- MODELO: 17 Tabelas Relacionais com Integridade Referencial ACID e Índices
-- ==============================================================================

-- 1. CRIAÇÃO E SELEÇÃO DO BANCO DE DADOS
CREATE DATABASE IF NOT EXISTS `skillswap`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `skillswap`;

-- Desativa temporariamente a checagem de chaves estrangeiras para limpeza ordenada
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `user_achievements`;
DROP TABLE IF EXISTS `achievements`;
DROP TABLE IF EXISTS `certificates`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `professional_verifications`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `chat_messages`;
DROP TABLE IF EXISTS `video_call_sessions`;
DROP TABLE IF EXISTS `scheduled_classes`;
DROP TABLE IF EXISTS `exchange_requests`;
DROP TABLE IF EXISTS `user_skills`;
DROP TABLE IF EXISTS `skills`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `administrators`;
DROP TABLE IF EXISTS `profiles`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- 2. CRIAÇÃO DAS TABELAS
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- TABELA 1: users (Usuários e Autenticação - RF01, RF02, RF03)
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  `xp` INT NOT NULL DEFAULT 50, -- 50 XP bônus de boas-vindas inicial (RF01)
  `level` INT NOT NULL DEFAULT 1,
  `streak_days` INT NOT NULL DEFAULT 1,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `reset_token` VARCHAR(100) NULL,
  `reset_token_exp` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_xp` (`xp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 2: profiles (Perfis Públicos, Bio e Contatos - RF04)
-- ------------------------------------------------------------------------------
CREATE TABLE `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `bio` TEXT NULL,
  `avatar_url` VARCHAR(255) NULL,
  `location` VARCHAR(100) NULL,
  `availability` JSON NULL, -- Array JSON: ["manha", "tarde", "noite", "finais_de_semana"]
  `phone` VARCHAR(20) NULL,
  `linkedin_url` VARCHAR(255) NULL,
  `github_url` VARCHAR(255) NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `reviews_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_profiles_user_id` (`user_id`),
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 3: administrators (Permissões Administrativas Avançadas - RF17)
-- ------------------------------------------------------------------------------
CREATE TABLE `administrators` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `department` VARCHAR(100) NOT NULL DEFAULT 'Moderação e Integridade',
  `can_manage_users` TINYINT(1) NOT NULL DEFAULT 1,
  `can_verify_certificates` TINYINT(1) NOT NULL DEFAULT 1,
  `can_moderate_reports` TINYINT(1) NOT NULL DEFAULT 1,
  `can_manage_categories` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_admin_user_id` (`user_id`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 4: categories (Catálogo Taxonômico de Áreas de Saber)
-- ------------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `description` VARCHAR(255) NULL,
  `icon` VARCHAR(50) NOT NULL DEFAULT 'tag',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 5: skills (Catálogo Geral de Habilidades Padronizadas)
-- ------------------------------------------------------------------------------
CREATE TABLE `skills` (
  `id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_skills_category_id` (`category_id`),
  KEY `idx_skills_name` (`name`),
  CONSTRAINT `fk_skills_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 6: user_skills (Habilidades que o Usuário Ensina e Quer Aprender - RF05, RF06)
-- ------------------------------------------------------------------------------
CREATE TABLE `user_skills` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `skill_id` VARCHAR(36) NULL,
  `custom_name` VARCHAR(100) NOT NULL,
  `type` ENUM('TEACHING', 'LEARNING') NOT NULL,
  `proficiency` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL DEFAULT 'INTERMEDIATE',
  `target_goal` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_skills_user` (`user_id`),
  KEY `idx_user_skills_type` (`type`),
  KEY `idx_user_skills_skill` (`skill_id`),
  CONSTRAINT `fk_user_skills_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_skills_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 7: exchange_requests (Solicitações Formais de Troca - RF09, RF10)
-- ------------------------------------------------------------------------------
CREATE TABLE `exchange_requests` (
  `id` VARCHAR(36) NOT NULL,
  `requester_id` VARCHAR(36) NOT NULL,
  `receiver_id` VARCHAR(36) NOT NULL,
  `offered_skill` VARCHAR(100) NOT NULL,
  `desired_skill` VARCHAR(100) NOT NULL,
  `proposal_note` TEXT NOT NULL,
  `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` DATETIME NULL,
  `completed_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_exchange_requester` (`requester_id`),
  KEY `idx_exchange_receiver` (`receiver_id`),
  KEY `idx_exchange_status` (`status`),
  CONSTRAINT `fk_exchange_requester` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_exchange_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 8: scheduled_classes (Agendamento de Aulas / Calendário - RF13)
-- ------------------------------------------------------------------------------
CREATE TABLE `scheduled_classes` (
  `id` VARCHAR(36) NOT NULL,
  `exchange_id` VARCHAR(36) NOT NULL,
  `teacher_id` VARCHAR(36) NOT NULL,
  `student_id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `scheduled_at` DATETIME NOT NULL,
  `duration_minutes` INT NOT NULL DEFAULT 60,
  `status` ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
  `meeting_room_id` VARCHAR(80) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sched_exchange` (`exchange_id`),
  KEY `idx_sched_teacher` (`teacher_id`),
  KEY `idx_sched_student` (`student_id`),
  KEY `idx_sched_date` (`scheduled_at`),
  CONSTRAINT `fk_sched_exchange` FOREIGN KEY (`exchange_id`) REFERENCES `exchange_requests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sched_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sched_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 9: video_call_sessions (Sessões de Videochamadas WebRTC - RF12)
-- ------------------------------------------------------------------------------
CREATE TABLE `video_call_sessions` (
  `id` VARCHAR(36) NOT NULL,
  `room_id` VARCHAR(80) NOT NULL,
  `initiator_id` VARCHAR(36) NOT NULL,
  `scheduled_class_id` VARCHAR(36) NULL,
  `status` ENUM('WAITING', 'ACTIVE', 'ENDED') NOT NULL DEFAULT 'WAITING',
  `started_at` DATETIME NULL,
  `ended_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_video_room_id` (`room_id`),
  KEY `idx_video_class` (`scheduled_class_id`),
  CONSTRAINT `fk_video_initiator` FOREIGN KEY (`initiator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_video_class` FOREIGN KEY (`scheduled_class_id`) REFERENCES `scheduled_classes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 10: chat_messages (Mensagens de Chat Bilateral - RF11)
-- ------------------------------------------------------------------------------
CREATE TABLE `chat_messages` (
  `id` VARCHAR(36) NOT NULL,
  `sender_id` VARCHAR(36) NOT NULL,
  `receiver_id` VARCHAR(36) NOT NULL,
  `content` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_chat_sender_receiver` (`sender_id`, `receiver_id`),
  KEY `idx_chat_created_at` (`created_at`),
  CONSTRAINT `fk_chat_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_chat_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 11: reviews (Avaliações e Notas Pós-Mentoria - RF14)
-- ------------------------------------------------------------------------------
CREATE TABLE `reviews` (
  `id` VARCHAR(36) NOT NULL,
  `exchange_id` VARCHAR(36) NOT NULL,
  `reviewer_id` VARCHAR(36) NOT NULL,
  `reviewed_user_id` VARCHAR(36) NOT NULL,
  `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `comment` TEXT NOT NULL,
  `is_moderated` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_review_exchange` (`exchange_id`),
  KEY `idx_review_reviewed_user` (`reviewed_user_id`),
  CONSTRAINT `fk_review_exchange` FOREIGN KEY (`exchange_id`) REFERENCES `exchange_requests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_reviewed` FOREIGN KEY (`reviewed_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 12: professional_verifications (Verificação de Instrutores - RF16)
-- ------------------------------------------------------------------------------
CREATE TABLE `professional_verifications` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `profession_title` VARCHAR(120) NOT NULL,
  `document_url` VARCHAR(255) NOT NULL,
  `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `feedback` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_verif_user` (`user_id`),
  KEY `idx_verif_status` (`status`),
  CONSTRAINT `fk_verif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 13: reports (Denúncias e Moderação da Comunidade - RF15)
-- ------------------------------------------------------------------------------
CREATE TABLE `reports` (
  `id` VARCHAR(36) NOT NULL,
  `reporter_id` VARCHAR(36) NOT NULL,
  `reported_user_id` VARCHAR(36) NOT NULL,
  `reported_content` VARCHAR(255) NULL,
  `reason` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('PENDING', 'RESOLVED', 'DISMISSED') NOT NULL DEFAULT 'PENDING',
  `admin_notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_reports_status` (`status`),
  KEY `idx_reports_reported` (`reported_user_id`),
  CONSTRAINT `fk_reports_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reports_reported` FOREIGN KEY (`reported_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 14: notifications (Notificações e Alertas In-App - RF18)
-- ------------------------------------------------------------------------------
CREATE TABLE `notifications` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(120) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `link` VARCHAR(100) NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'INFO',
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_notif_user_read` (`user_id`, `is_read`),
  CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 15: achievements (Catálogo de Insígnias e Conquistas - RF19)
-- ------------------------------------------------------------------------------
CREATE TABLE `achievements` (
  `id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(50) NOT NULL DEFAULT 'trophy',
  `points_reward` INT NOT NULL DEFAULT 50,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_achievements_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 16: user_achievements (Conquistas Desbloqueadas pelo Usuário - RF19)
-- ------------------------------------------------------------------------------
CREATE TABLE `user_achievements` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `achievement_id` VARCHAR(36) NOT NULL,
  `unlocked_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_achievement` (`user_id`, `achievement_id`),
  CONSTRAINT `fk_ua_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ua_achievement` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- TABELA 17: certificates (Certificados Digitais com Hash - RF20)
-- ------------------------------------------------------------------------------
CREATE TABLE `certificates` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `skill_name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `hours_completed` INT NOT NULL DEFAULT 10,
  `verification_code` VARCHAR(50) NOT NULL,
  `issued_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cert_code` (`verification_code`),
  KEY `idx_cert_user` (`user_id`),
  CONSTRAINT `fk_cert_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 3. CARGA DE DADOS INICIAIS (SEEDS / DADOS MOCKADOS)
-- ==============================================================================

-- Categorias de Habilidades
INSERT INTO `categories` (`id`, `name`, `description`, `icon`) VALUES
('cat-1', 'Tecnologia', 'Programação, Dados, Cloud e Inteligência Artificial', 'code'),
('cat-2', 'Design', 'UI/UX, Design Gráfico, Prototipação e Modelagem 3D', 'palette'),
('cat-3', 'Idiomas', 'Conversação, Gramática e Inglês Profissional', 'languages'),
('cat-4', 'Negócios', 'Gestão, Marketing, Finanças e Comunicação', 'briefcase'),
('cat-5', 'Áudio & Vídeo', 'Edição de Vídeo, Podcasting e Produção Audiovisual', 'video'),
('cat-6', 'Música', 'Instrumentos, Teoria Musical e Canto', 'music');

-- Catálogo de Habilidades Padronizadas
INSERT INTO `skills` (`id`, `category_id`, `name`, `description`) VALUES
('sk-1', 'cat-1', 'React.js & Hooks', 'Construção de SPAs modernas com React e Ecossistema Web'),
('sk-2', 'cat-1', 'TypeScript Avançado', 'Tipagem estática, interfaces e arquitetura escalável'),
('sk-3', 'cat-1', 'Next.js 14 App Router', 'Framework fullstack React com Server Components'),
('sk-4', 'cat-2', 'Figma & Design Systems', 'Auto-Layout, prototipação avançada e tokens de design'),
('sk-5', 'cat-3', 'Inglês para Entrevistas Tech', 'Conversação prática e simulação de processos seletivos internacionais'),
('sk-6', 'cat-1', 'Python & Data Science', 'Automação, Pandas, NumPy e Ciência de Dados'),
('sk-7', 'cat-1', 'SQL & Modelagem de Dados', 'Bancos relacionais, queries complexas e normalização');

-- Usuários Base (Senha padrão: 123456 - Hash bcrypt ilustrativo ou texto claro para testes locais)
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `xp`, `level`, `streak_days`, `is_verified`) VALUES
('user-1', 'Ana Silva', 'ana.silva@tech.com', '123456', 'USER', 380, 3, 6, 1),
('user-2', 'Carlos Mendes', 'carlos.mendes@design.com', '123456', 'USER', 520, 4, 8, 1),
('user-3', 'Beatriz Lima', 'beatriz.lima@lingua.com', '123456', 'USER', 210, 2, 4, 0),
('user-4', 'Gabriel Rocha', 'gabriel.rocha@data.com', '123456', 'USER', 440, 3, 5, 1),
('user-admin', 'Rodrigo Moderador', 'admin@skillswap.com', '123456', 'ADMIN', 990, 5, 12, 1);

-- Perfis dos Usuários
INSERT INTO `profiles` (`id`, `user_id`, `bio`, `avatar_url`, `location`, `availability`, `phone`, `linkedin_url`, `github_url`, `rating`, `reviews_count`) VALUES
('prof-1', 'user-1', 'Desenvolvedora Front-end Senior com 6 anos de experiência. Adoro ensinar React/TypeScript e quero aprender Figma e Design Systems.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'São Paulo, SP', '[\"noite\", \"finais_de_semana\"]', '(11) 98765-4321', 'linkedin.com/in/anasilva-dev', 'github.com/anasilva', 4.90, 14),
('prof-2', 'user-2', 'Lead Product Designer em Fintech. Especialista em Design System, Auto-Layout no Figma e Arquitetura de Informação.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'São Paulo, SP', '[\"noite\", \"finais_de_semana\"]', '(11) 99876-5432', 'linkedin.com/in/carlosmendes-design', 'github.com/carlosmendes', 5.00, 22),
('prof-3', 'user-3', 'Professora de idiomas há 8 anos com vivência em Londres e Toronto. Foco em conversação prática para entrevistas.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Curitiba, PR', '[\"manha\", \"noite\"]', '(41) 99123-4567', 'linkedin.com/in/beatrizlima-idiomas', NULL, 4.80, 9),
('prof-4', 'user-4', 'Cientista de Dados e Engenheiro Machine Learning. Ensino Python, Pandas e SQL para quem quer migrar para a área de dados.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Rio de Janeiro, RJ', '[\"noite\"]', '(21) 98888-7777', 'linkedin.com/in/gabrielrocha-data', 'github.com/gabrielrocha', 4.90, 16),
('prof-5', 'user-admin', 'Administrador do Ecossistema SkillSwap. Responsável por integridade, moderação de denúncias e homologação de certificados.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', 'Florianópolis, SC', '[\"manha\", \"tarde\", \"noite\"]', '(48) 99999-0000', 'linkedin.com/in/rodrigomoderador', NULL, 5.00, 40);

-- Permissões Administrativas
INSERT INTO `administrators` (`id`, `user_id`, `department`, `can_manage_users`, `can_verify_certificates`, `can_moderate_reports`, `can_manage_categories`) VALUES
('adm-1', 'user-admin', 'Coordenação Geral de Comunidade', 1, 1, 1, 1);

-- Habilidades dos Usuários (Ensino e Aprendizado)
INSERT INTO `user_skills` (`id`, `user_id`, `skill_id`, `custom_name`, `type`, `proficiency`, `target_goal`) VALUES
('usk-1', 'user-1', 'sk-1', 'React.js & Hooks', 'TEACHING', 'EXPERT', NULL),
('usk-2', 'user-1', 'sk-2', 'TypeScript Avançado', 'TEACHING', 'ADVANCED', NULL),
('usk-3', 'user-1', 'sk-4', 'Figma & Design Systems', 'LEARNING', 'BEGINNER', 'Criar protótipos de alta fidelidade e tokens'),
('usk-4', 'user-1', 'sk-5', 'Inglês para Entrevistas Tech', 'LEARNING', 'INTERMEDIATE', 'Fluência em conversação profissional'),
('usk-5', 'user-2', 'sk-4', 'Figma & Design Systems', 'TEACHING', 'EXPERT', NULL),
('usk-6', 'user-2', 'sk-1', 'React.js & Hooks', 'LEARNING', 'BEGINNER', 'Construir meus próprios side-projects'),
('usk-7', 'user-3', 'sk-5', 'Inglês para Entrevistas Tech', 'TEACHING', 'EXPERT', NULL),
('usk-8', 'user-3', 'sk-1', 'Desenvolvimento Web Básico', 'LEARNING', 'BEGINNER', 'Criar meu próprio site de aulas'),
('usk-9', 'user-4', 'sk-6', 'Python & Data Science', 'TEACHING', 'EXPERT', NULL),
('usk-10', 'user-4', 'sk-7', 'SQL & Modelagem de Dados', 'TEACHING', 'ADVANCED', NULL),
('usk-11', 'user-4', 'sk-1', 'React.js & Hooks', 'LEARNING', 'BEGINNER', 'Construir dashboards interativos na web');

-- Solicitações de Troca
INSERT INTO `exchange_requests` (`id`, `requester_id`, `receiver_id`, `offered_skill`, `desired_skill`, `proposal_note`, `status`, `created_at`, `accepted_at`) VALUES
('exc-1', 'user-2', 'user-1', 'Figma & Design Systems', 'React.js & Hooks', 'Oi Ana! Vi que você quer aprender Figma e você domina React. Podemos fazer uma troca de 1h por semana!', 'ACCEPTED', '2026-10-20 14:30:00', '2026-10-20 16:00:00'),
('exc-2', 'user-3', 'user-1', 'Inglês para Entrevistas Tech', 'React.js & Hooks', 'Olá Ana! Adoraria praticar inglês com você para processos seletivos internacionais em troca de introdução a React.', 'PENDING', '2026-10-22 19:15:00', NULL),
('exc-3', 'user-1', 'user-4', 'React.js & Hooks', 'SQL & Modelagem de Dados', 'Oi Gabriel! Vamos trocar aulas práticas de SQL por React?', 'COMPLETED', '2026-10-10 10:00:00', '2026-10-10 11:00:00');

-- Aulas Agendadas
INSERT INTO `scheduled_classes` (`id`, `exchange_id`, `teacher_id`, `student_id`, `title`, `description`, `scheduled_at`, `duration_minutes`, `status`, `meeting_room_id`) VALUES
('sc-1', 'exc-1', 'user-2', 'user-1', 'Aula 1: Fundamentos de Auto-Layout no Figma', 'Dominando pilhas horizontais, verticais e paddings dinâmicos.', '2026-11-20 19:30:00', 60, 'SCHEDULED', 'room-figma-ana-carlos'),
('sc-2', 'exc-1', 'user-1', 'user-2', 'Aula 2: Componentes Reutilizáveis com React & Tailwind', 'Transformando protótipos do Figma em componentes com props.', '2026-11-27 19:30:00', 60, 'SCHEDULED', 'room-react-carlos-ana');

-- Mensagens de Chat
INSERT INTO `chat_messages` (`id`, `sender_id`, `receiver_id`, `content`, `is_read`, `created_at`) VALUES
('msg-1', 'user-2', 'user-1', 'Oi Ana! Muito feliz que aceitou a proposta de troca de Figma por React!', 1, '2026-10-21 10:00:00'),
('msg-2', 'user-1', 'user-2', 'Oi Carlos! Eu também! Já organizei um projeto básico com Vite + React para te passar o passo a passo.', 1, '2026-10-21 10:05:00'),
('msg-3', 'user-2', 'user-1', 'Perfeito! Na nossa primeira aula vamos focar em Tokens de Cores e Auto-Layout!', 1, '2026-10-21 10:10:00');

-- Avaliações
INSERT INTO `reviews` (`id`, `exchange_id`, `reviewer_id`, `reviewed_user_id`, `rating`, `comment`) VALUES
('rev-1', 'exc-3', 'user-1', 'user-4', 5, 'O Gabriel é super didático! Em apenas 3 aulas já consegui modelar consultas complexas em SQL sem medo!'),
('rev-2', 'exc-3', 'user-4', 'user-1', 5, 'A Ana explica React com uma facilidade incrível. Desmistificou totalmente o funcionamento do useEffect e custom hooks.');

-- Insígnias e Conquistas do Sistema
INSERT INTO `achievements` (`id`, `code`, `title`, `description`, `icon`, `points_reward`) VALUES
('ach-1', 'FIRST_LOGIN', 'Primeiro Passo', 'Criou sua conta gratuita no SkillSwap e completou seu perfil inicial.', 'sparkles', 50),
('ach-2', 'FIRST_EXCHANGE', 'Troca Pioneira', 'Enviou ou aceitou sua primeira solicitação formal de permuta.', 'repeat', 75),
('ach-3', 'FIRST_CLASS', 'Sala de Aula Virtual', 'Realizou sua primeira aula prática de videochamada WebRTC.', 'video', 100),
('ach-4', 'HIGH_RATING', 'Mentor 5 Estrelas', 'Recebeu 5 avaliações consecutivas com nota máxima de 5.0.', 'star', 150),
('ach-5', 'STREAK_7', 'Incansável', 'Manteve 7 dias consecutivos de atividade na comunidade.', 'flame', 120),
('ach-6', 'POLYGLOT', 'Mente Polímata', 'Cadastrou competências em mais de 3 categorias distintas de conhecimento.', 'compass', 80),
('ach-7', 'CERTIFIED_PRO', 'Verificação de Mérito', 'Submeteu diploma formal e obteve o selo de instrutor verificado.', 'award', 200),
('ach-8', 'COMMUNITY_PILLAR', 'Pilar da Comunidade', 'Acumulou mais de 1.000 XP através de mentorias de Moeda Zero.', 'trophy', 250);

-- Conquistas Desbloqueadas pelos Usuários
INSERT INTO `user_achievements` (`id`, `user_id`, `achievement_id`) VALUES
('uach-1', 'user-1', 'ach-1'),
('uach-2', 'user-1', 'ach-2'),
('uach-3', 'user-1', 'ach-4'),
('uach-4', 'user-2', 'ach-1'),
('uach-5', 'user-2', 'ach-2'),
('uach-6', 'user-2', 'ach-5'),
('uach-7', 'user-2', 'ach-7');

-- Certificados Emitidos
INSERT INTO `certificates` (`id`, `user_id`, `title`, `skill_name`, `description`, `hours_completed`, `verification_code`) VALUES
('cert-1', 'user-1', 'Certificado de Conclusão de Mentoria Bilateral', 'Figma & Design Systems para Desenvolvedores', 'Certificamos que Ana Silva concluiu com êxito 10 horas de mentoria prática de Design Systems, abordando Auto-Layout, Tokens de Design e Prototipação Avançada no ecossistema SkillSwap.', 10, 'SKILL-9F8A-42E1-BC77');

-- Notificações In-App
INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `link`, `is_read`) VALUES
('notif-1', 'user-1', 'Nova Proposta de Permuta! 🤝', 'Beatriz Lima propôs trocar aulas de Inglês por React.', '#trocas', 0),
('notif-2', 'user-1', 'Aula Confirmada 📅', 'Carlos Mendes confirmou a sessão de Auto-Layout para sexta-feira às 19:30.', '#agenda', 1);

-- ==============================================================================
-- FIM DO SCRIPT SQL (schema.sql)
-- Para importar via phpMyAdmin ou MySQL CLI:
-- mysql -u root -p < database/schema.sql
-- ==============================================================================

