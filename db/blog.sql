-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Июн 05 2025 г., 15:28
-- Версия сервера: 8.0.35
-- Версия PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `blog`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'There is no description in this category yet',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Path to category image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`) VALUES
(1, 'Studio Stories', 'Behind-the-scenes looks at the creative process, from sketches to finished ceramics', ''),
(2, 'Techniques and Tutorials', 'Step-by-step guides and tips on wheel throwing, hand-building, glazing, and more', 'uploads\\categories\\ceramic-vase.jpg'),
(3, 'Clay and Materials', 'Explore different clay types, tools, glazes, and how they affect your creations', 'uploads\\categories\\ceramic-vase.jpg'),
(4, 'Artist Spotlights', 'Interviews and features on talented ceramic artists and their unique approaches', 'uploads\\categories\\ceramic-vase.jpg'),
(5, 'Inspiration and Trends', 'Discover design ideas, seasonal collections, and current trends in ceramics', 'uploads\\categories\\ceramic-vase.jpg'),
(6, 'Selling and Branding', 'Advice on pricing, photography, marketing, and selling your ceramics online or at markets', 'uploads\\categories\\ceramic-vase.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `text` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `text`, `post_id`, `user_id`, `created_at`, `updated_at`) VALUES
(37, 'seulhg oeluhjgeujgh oeigoeughseourg oeigoerk', 35, 11, '2025-06-02 12:29:31', '2025-06-02 12:29:31'),
(38, 'sehu oauergh aeurgh aieur giaeurg aierg', 35, 11, '2025-06-02 12:29:44', '2025-06-02 12:29:44'),
(40, 'фкфукпыук фукпыукпуыкп фукпуфкпк', 35, 15, '2025-06-05 07:33:10', '2025-06-05 07:33:10');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `title`, `description`, `text`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Будущее технологий', 'Описание новых технологических трендов. Описание новых технологических трендов Описание новых технологических трендов Описание новых технологических трендов', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam. Sapiente sunt cupiditate quidem perferendis sint impedit rem, eaque vitae similique doloremque error qui veniam, voluptatibus saepe obcaecati, quibusdam molestias debitis perspiciatis ratione libero facilis possimus! Aspernatur dignissimos nesciunt quibusdam provident pariatur sequi animi quo ipsa nisi eveniet, vel voluptate deleniti, eaque corrupti nemo. Consectetur iure expedita similique quis quos explicabo.', 'uploads/posts/ceramic-vase.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(2, 2, 'Лучшие места для путешествий в 2025', 'Список стран, которые стоит посетить...', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam. Sapiente sunt cupiditate quidem perferendis sint impedit rem, eaque vitae similique doloremque error qui veniam, voluptatibus saepe obcaecati, quibusdam molestias debitis perspiciatis ratione libero facilis possimus! Aspernatur dignissimos nesciunt quibusdam provident pariatur sequi animi quo ipsa nisi eveniet, vel voluptate deleniti, eaque corrupti nemo. Consectetur iure expedita similique quis quos explicabo at consequatur assumenda maiores obcaecati atque, eum architecto delectus, voluptas enim. Possimus, non eaque.', 'uploads/posts/potter.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(3, 3, 'Рецепты весенних блюд', 'Пошаговые рецепты сезонных блюд...', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam. Sapiente sunt cupiditate quidem perferendis sint impedit rem, eaque vitae similique doloremque error qui veniam, voluptatibus saepe obcaecati, quibusdam molestias debitis perspiciatis ratione libero facilis possimus!', 'uploads/posts/store.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(4, 4, 'Фитнес-тренды этого года', 'Как поддерживать форму и здоровье...', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam. Sapiente sunt cupiditate quidem perferendis.', 'uploads/posts/tea.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(5, 5, 'Современное искусство: новые формы', 'Обзор выставок и направлений...', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam.', 'uploads/posts/tea-2.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(6, 6, 'ИИ в повседневной жизни', 'Применение искусственного интеллекта дома и на работе...', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione maiores quod officia reiciendis laudantium, doloribus facilis quia provident, doloremque aspernatur. Architecto debitis perspiciatis perferendis, eum odit quia quam ex numquam, explicabo nam minima dolorum modi, magnam totam quaerat eos sequi id nihil. Quasi, esse tempora veritatis, quis quidem officiis, aut cumque sapiente harum voluptate fuga libero? Dolores sint vel, autem, consequuntur animi recusandae saepe neque, veniam ut aliquid error. Commodi illo a rerum est, nulla laudantium ab reiciendis ratione vero veritatis provident accusamus sit deserunt ducimus tenetur optio ipsa reprehenderit adipisci minus sunt debitis omnis esse! Optio corrupti accusantium exercitationem accusamus minus ad totam fuga! Asperiores assumenda sit maxime numquam, quae dolores iste repellendus fugiat debitis obcaecati, placeat beatae cupiditate minus laboriosam ipsam nesciunt officiis commodi fuga consequuntur possimus quis? Nam laboriosam, et recusandae ad quasi, sapiente nostrum officia odio omnis tempore accusantium nihil dolorum fuga repellendus similique sit? Atque aliquid ex, dolore architecto similique, ratione ipsum dicta natus nisi deleniti sunt nesciunt consequuntur aut animi hic error cum deserunt voluptate consequatur, ducimus fugit. Provident eum velit culpa, dignissimos, rem voluptatum debitis fugiat odio aliquam dolores necessitatibus tempore laudantium assumenda. Fuga, ipsum expedita! Neque rem numquam eum suscipit tempora facilis dolorum rerum omnis, libero laboriosam mollitia debitis dolorem perferendis sapiente deserunt alias, consequuntur non voluptates architecto sit ipsam quam similique minima. Provident dignissimos hic rerum ipsam qui aperiam nostrum nulla tempora ad. Excepturi cum velit, architecto nihil ex aspernatur culpa, doloremque impedit natus nisi in itaque sed corrupti est blanditiis quisquam. Eligendi voluptatem odit possimus molestiae quae aperiam amet debitis accusamus eum nobis, corporis unde nam excepturi! Dolorum, veniam odit laudantium recusandae architecto tempore quisquam. Illum minima molestiae necessitatibus provident quas, sunt perferendis temporibus autem quam iste! Vitae accusamus praesentium aut quasi quisquam in dolorum error veniam dolorem beatae quidem impedit repudiandae, voluptatum veritatis ab molestiae ipsam aliquam libero facere labore excepturi porro dolore! Ipsa veritatis id non nesciunt voluptatum eum voluptatem ab! Nemo velit labore odio, quasi quas voluptate. Commodi, voluptates quos. Minus nulla dolore quis cum, tenetur aliquid recusandae non. Esse ad nemo exercitationem laudantium praesentium sequi a dolores quam recusandae, incidunt tempore odio, accusantium perspiciatis ullam, cumque nobis illum maiores facere doloribus? Ipsam praesentium, quos iure minima qui veritatis tenetur pariatur cum facilis maiores fugiat quibusdam, similique dolores nobis ea tempore soluta. Amet quidem recusandae non voluptatibus labore at perspiciatis, accusantium aut quod ipsum odit tempora, deleniti, voluptates doloribus velit quasi repudiandae. Unde sequi eaque mollitia animi iure exercitationem laboriosam eveniet fugit accusamus tenetur impedit odio odit veniam ab nostrum qui recusandae ratione quaerat nihil doloribus iusto eligendi, rerum praesentium nam. Sapiente sunt cupiditate quidem perferendis sint impedit rem, eaque vitae similique doloremque error qui veniam, voluptatibus saepe obcaecati, quibusdam molestias debitis perspiciatis ratione libero facilis possimus! Aspernatur dignissimos nesciunt quibusdam provident pariatur sequi animi quo ipsa nisi eveniet, vel voluptate deleniti, eaque corrupti nemo. Consectetur iure expedita similique quis quos explicabo at consequatur assumenda maiores obcaecati atque, eum architecto delectus, voluptas enim. Possimus, non eaque.', 'uploads/posts/tea-ceremony.jpg', '2025-04-21 14:53:11', '2025-05-14 11:21:37'),
(11, 1, 'Inside the Ceramic Studio', 'A glimpse into daily studio life', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(12, 1, 'From Clay to Cup', 'Documenting the full process', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(13, 1, 'Sketching Ideas', 'How concepts come to life in clay', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(14, 1, 'Firing Day', 'Preparing and loading the kiln', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(15, 2, 'Beginner’s Wheel Throwing', 'Step-by-step tutorial for beginners', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(16, 2, 'How to Center Clay', 'Master the foundation of wheel work', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(17, 2, 'Hand-Building a Mug', 'Simple techniques for beginners', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(18, 2, 'Tips for Better Glazing', 'Avoid common mistakes', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(19, 2, 'Creating Texture with Tools', 'Give your work unique finishes', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(20, 3, 'Types of Clay Explained', 'Which clay is right for your work?', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(21, 3, 'What Makes a Good Glaze?', 'Key ingredients and combinations', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(22, 3, 'Essential Studio Tools', 'The must-haves for any ceramicist', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(23, 4, 'Meet Jane Doe', 'A potter blending tradition and minimalism', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(24, 4, 'Modern Rustic: John Smith', 'How nature inspires his style', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(25, 4, 'Ceramic Voices: Global Makers', 'Exploring worldwide ceramic culture', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(26, 4, 'Studio Tour with Emma Clay', 'A peek into her creative space', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(27, 5, '2025 Color Trends in Ceramics', 'What’s hot this year?', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(28, 5, 'Nature-Inspired Pottery', 'Organic shapes and textures', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(29, 5, 'Holiday Collection Ideas', 'Seasonal designs that sell', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(30, 6, 'How to Price Your Work', 'Find the right balance', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(31, 6, 'Best Platforms to Sell Online', 'From Etsy to your own site', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(32, 6, 'Ceramic Photography Tips', 'Make your pieces shine online', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(33, 6, 'Craft Fair Success Guide', 'What to bring and how to sell', 'Lorem ipsum dolor sit amet...', NULL, '2025-05-25 08:48:51', '2025-05-25 08:48:51'),
(35, 1, 'New Post 555', 'aekrjfhre eurh oaeruhaurhg', 'soerghseorgh oergh ouergeugr', NULL, '2025-06-01 07:06:19', '2025-06-01 10:18:23'),
(38, NULL, 'New Post in New Category 1', 'aouhvaurhva aeufvhaeurvharuv aeurhvauwrha urhvawiruh', 'eruhveiurhfv euhvqurhv qurwhqurhf', NULL, '2025-06-05 14:17:14', '2025-06-05 14:17:14');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `avatar`, `created_at`, `updated_at`) VALUES
(11, 'Vik Admin', 'viktor@gmail.com', '$2y$10$AN/KI19ymlfU5tbvI3.kOepzkVZqlrqAClSD/vMclZfD4E9Jcow6O', 'admin', '/uploads/avatars/avatar_68394334206bb7.84390680.jpg', '2025-05-30 06:33:40', '2025-05-30 07:16:50'),
(15, 'Claudia', 'vikt@gmail.com', '$2y$10$Gleog0L1KaX4Szf9dTR0LuOEl0b0IcIXHETjulTSYx1zPfCAx8azS', 'user', '/uploads/avatars/avatar_6840483eb2edd0.17638174.jpg', '2025-06-03 10:58:33', '2025-06-04 14:52:15'),
(17, 'Vfd', 'vik@gmail.com', '$2y$10$.BlHVl79FFDlCvOpWTn.Te5j27mAowYmUJ984v1nVpj2BDG8ZFDzK', 'user', '/uploads/avatars/avatar_684025eb37e051.32191419.jpg', '2025-06-03 14:53:10', '2025-06-04 12:40:34'),
(18, 'Viktorio', 'viktordoming@gmail.com', '$2y$10$e6RbBTtIc6kQPUzAFezDHe7W06iiXOq0D/r7Tq5IACbR2EDKIeiQO', 'admin', '/uploads/avatars/avatar_684062bedf9dc6.76848917.jpg', '2025-06-04 16:14:06', '2025-06-04 16:14:06'),
(19, 'Super', 'viktordo@gmail.com', '$2y$10$I7hmIgx0N2yjMTCTn/X2/uIdwaV2zW4d7N.19Xk.i4b7ojOzXMIr2', 'admin', '/uploads/avatars/avatar_684122bf237bc2.26689922.jpg', '2025-06-05 05:53:19', '2025-06-05 05:53:19');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category-name` (`name`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
