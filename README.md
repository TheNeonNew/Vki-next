# Разработка учебного веб-приложения "Страница ВКИ НГУ"
## [Содержание:](#разработка-учебного-веб-приложения-страница-вки-нгу)
  - [Установка и запуск](#установка-и-запуск)
  - [Работа с приложением](#работа-с-приложением)


## Установка и запуск

1. Выполнить клонирование проект на диск С: в личную папку (на диске G: проект не развернется)

2. Открыть папку проекта в VSCode

3. Конфигурация. Добавить файл .env.local со следующими данными:
```
DB="./db/vki-web-orm.db"
NEXT_PUBLIC_API="http://localhost:3000/api/"
```

4. В терминале VSCode выполнить следующие команды:
```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

5. Выполнить установку npm пакетов:

```
npm i
```

6. Запустить проект:

```
npm run dev
```

## Работа с приложением
Открыть в браузере вкладку приложения. Далее следует перечень ссылок на различнный функционал приложения

http://localhost:3000/ - приложение

http://localhost:3000/api/groups - апи

## Назначение файлов
.\api\
.\app\
.\components\
.\constants\
.\containers\
.\db\
.\hooks\
.\http\
.\services\
.\styles\
.\types\
.\utils\
.\api\groupsApi.ts\
.\api\reactQueryClient.ts\
.\api\studentsApi.ts\
.\app\api\
.\app\groups\
.\app\login\
.\app\students\
.\app\favicon.ico\
.\app\globals.css\
.\app\layout.tsx\
.\app\page.tsx\
.\app\api\groups\
.\app\api\students\
.\app\api\groups\route.ts\
.\app\api\students\add\
.\app\api\students\fill\
.\app\api\students[id]\
.\app\api\students\route.ts\
.\app\api\students\add\route.ts\
.\app\api\students\fill\route.ts\
.\app\api\students[id]\route.ts\
.\app\groups\page.tsx\
.\app\login\page.tsx\
.\app\students\page.tsx\
.\components\AddStudent\
.\components\auth\
.\components\BarChart\
.\components\Groups\
.\components\layout\
.\components\Students\
.\components\AddStudent\AddStudent.module.scss\
.\components\AddStudent\AddStudent.tsx\
.\components\auth\LoginForm\
.\components\auth\LoginForm\LoginForm.module.scss\
.\components\auth\LoginForm\LoginForm.tsx\
.\components\BarChart\BarChart.module.scss\
.\components\BarChart\BarChart.tsx\
.\components\Groups\Groups.module.scss\
.\components\Groups\Groups.tsx\
.\components\layout\Footer\
.\components\layout\Header\
.\components\layout\Main\
.\components\layout\Menu\
.\components\layout\Page\
.\components\layout\Footer\Footer.module.scss\
.\components\layout\Footer\Footer.tsx\
.\components\layout\Header\Profile\
.\components\layout\Header\Header.module.scss\
.\components\layout\Header\Header.tsx\
.\components\layout\Header\Profile\Profile.module.scss\
.\components\layout\Header\Profile\Profile.tsx\
.\components\layout\Main\Main.module.scss\
.\components\layout\Main\Main.tsx\
.\components\layout\Menu\Menu.module.scss\
.\components\layout\Menu\Menu.tsx\
.\components\layout\Page\Page.module.scss\
.\components\layout\Page\Page.tsx\
.\components\Students\Student.module.scss\
.\components\Students\Student.tsx\
.\components\Students\StudentsList.module.scss\
.\components\Students\StudentsList.tsx\
.\constants\meta.ts\
.\containers\TanStackQuery.tsx\
.\db\entity\
.\db\AppDataSource.ts\
.\db\groupDb.ts\
.\db\studentsDb.ts\
.\db\entity\Group.entity.ts\
.\db\entity\Student.entity.ts\
.\db\entity\User.entity.ts\
.\hooks\useAuth.ts\
.\hooks\useGroups.ts\
.\hooks\useStudents.ts\
.\http\add-next.http\
.\http\add-student.http\
.\http\delete-student.http\
.\http\get-groups.http\
.\services\GroupService.ts\
.\services\StudentService.ts\
.\services\UserService.ts\
.\styles\functions.scss\
.\styles\globals.scss\
.\styles\main.scss\
.\styles\vars.scss\
.\types\chart.ts\
.\types\ChildrenType.ts\
.\types\FioInterface.ts\
.\types\GroupInterface.ts\
.\types\StudentInterface.ts\
.\types\UserInterface.ts\
.\utils\capitalize.ts\
.\utils\getRandomFio.ts\
.\utils\getRandomNumber.ts\
.\utils\isServer.ts\
.\utils\jwt.ts\
.\utils\password.ts\

