# WebApp Module Structure

`app/`
- composition root cho web app
- chua router, providers, app shell

`entities/`
- dinh nghia doi tuong nghiep vu cot loi
- vi du: `User`, `Course`, `Lesson`, `Quiz`, `Notification`

`features/`
- logic theo nghiep vu
- moi feature co the chua `screens/`, `data/`, `model/`, `index.ts`

`screens/`
- man hinh cu the cua ung dung
- hien tai van duoc giu lai de tranh refactor qua rong trong mot lan

Nguyen tac:
- entity types khong nam trong context hoac screen
- auth/persistence khong nam trong `App.tsx`
- route registry khong nam trong mot file duy nhat nua
- `index.ts` la entrypoint import cho tung feature khi phu hop
