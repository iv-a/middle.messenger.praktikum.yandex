<h3 align="center">
  <a href="#about">О проекте</a>
  •
  <a href="#techs">Технологии</a>
  •
  <a href="#install">Установка</a>
</h3>

<h1 id="about">О проекте</h1>
<p><b>Веб‑мессенджер</b> — одностраничное приложение (SPA) для обмена сообщениями в реальном времени. Позволяет пользователям регистрироваться, авторизоваться и вести переписку в личных и групповых чатах.</p>

<h1 id="techs">Основное</h1>
<ul>
  <li>Макет в Figma: <a href="https://www.figma.com/design/2Pct2e3LBlMx1ylidCVPWN/Untitled?node-id=0-1&t=34OGcHgPGBEdVWXE-1">ССЫЛКА</a></li>
  <li>DEPLOY: <a href="https://statuesque-hummingbird-dc70d6.netlify.app">ССЫЛКА</a></li>
</ul>

<h1 id="func">Основная функциональность</h1>
<ul>
  <li><b>Регистрация и авторизация</b> через REST API</li>
  <li><b>Создание и управление чатами:</b> возможность создавать новые чаты, переименовывать и удалять их</li>
  <li>
    <b>Обмен сообщениями:</b>
    <ul>
      <li>Отправка и получение текстовых сообщений в реальном времени через WebSocket</li>
      <li>Загрузка и отображение медиа (изображения, файлы)</li>
      <li>Пагинация истории переписки</li>
    </ul>
  </li>
  <li>
    <b>Профиль пользователя:</b>
    <ul>
      <li>Изменение имени, данных профиля и пароля</li>
      <li>Загрузка и обновление аватарки</li>
    </ul>
  </li>
  <li><b>Обработка ошибок:</b> кастомные страницы 404 и 500</li>
</ul>

<h1 id="techs">Страницы:</h1>
<ul>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/sign-in">Sign In</a></li>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/sign-up">Sign Up</a></li>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/chats">Chats</a></li>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/settings">Settings</a></li>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/404">404</a></li>
  <li><a href="https://statuesque-hummingbird-dc70d6.netlify.app/500">500</a></li>
</ul>

<h1 id="techs">Технологии и инструменты</h1>
<h3>Фронтенд</h3>
<ul>
  <li><b>TypeScript</b> — статическая типизация для повышения надёжности кода</li>
  <li><b>Vite</b> — быстрая сборка и быстрая разработка</li>
  <li><b>Handlebars</b> — шаблонизатор для генерации HTML</li>
  <li><b>CSS Modules</b> — локализация стилей на уровне компонентов</li>
  <li><b>PostCSS + Autoprefixer</b> — трансформация CSS и автоматическая префиксация</li>
  <li><b>WebSocket API</b> —  двунаправленный обмен данными в реальном времени</li>
</ul>

<h3>Инструменты разработки</h3>
<ul>
  <li><b>ESLint</b> с конфигурацией TypeScript — статический анализ JavaScript/TypeScript</li>
  <li><b>Prettier</b> — единый стиль форматирования кода</li>
  <li><b>Stylelint</b> — линтинг CSS</li>
  <li><b>GitHub Actions</b> — CI/CD для проверки сборки и линтинга</li>
</ul>

<h3>Деплой</h3>
<ul>
  <li><b>Netlify</b> — автоматический деплой из ветки <code>deploy</code></li>
</ul>

<h1 id="install">Установка</h1>
<ol>
<li>
  <p>Создаем рабочую директорию с произвольным именем (например dev):</p>
<pre>
mkdir <имя рабочей директории>
</pre>
</li>
<li>
  <p>Клонируем репозиторий в рабочую директорию:</p>
  <ul>
  <li>
    <p>Переходим в рабочую директорию:</p>
<pre>
cd <имя рабочей директории>/
</pre>
  </li>
  <li>
    <p>Клонируем репо:</p>
<pre>
git clone https://github.com/iv-a/middle.messenger.praktikum.yandex.git
</pre>
  </li>
    <li>
      В рабочей директории должна появиться папка проекта <code>middle.messenger.praktikum.yandex.git</code>
    </li>
  </ul>
</li>
<li>
  <p>Переходим в папку с проектом:</p>
<pre>
cd middle.messenger.praktikum.yandex.git/
</pre>
</li>
  
<li>
  <p>Устанавливаем зависимости:</p>
<pre>
npm install
</pre>
</li>
<li>
  <p>Запускаем проект:</p>
<pre>
npm run start
</pre>
</li>
</ol>

<h1 id="install">Тестирование</h1>
<ol>
<li>
  <p>Если ещё не установлены зависимости:</p>
<pre>
npm install
</pre>
</li>
<li>
  <p>Запуск всех тестов (скрипт `"test": "mocha"` в package.json)</p>
<pre>
npm test
</pre>
</li>
</ol>
