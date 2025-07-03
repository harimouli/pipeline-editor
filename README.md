# 🧠 Pipeline Editor

A **visual DAG (Directed Acyclic Graph) editor** built using **React**, **TypeScript**, and **React Flow**. Create and manage complex workflows with intuitive drag-and-drop functionality.

🔗 [Live Demo](https://pipeline-editor-rust.vercel.app/)
📦 [GitHub Repo](https://github.com/harimouli/pipeline-editor.git)

---

## 🚀 Features

* ✅ **Add Custom Nodes** (Input, Process, Transform, Output)
* 🔗 **Connect Nodes** visually with smooth edges
* 🧠 **DAG Validation** (no cycles, self-loops, or unconnected nodes)
* 🧼 **Clear All** with confirmation
* ⚙️ **Auto Layout** using `dagre`
* ⌨️ Keyboard support (`Delete`/`Backspace` for selected elements)
* 📊 **Real-time Stats View**
* 🧾 **JSON Preview & Copy** DAG structure

---

## 📸 Preview

> *(Add your screenshot here or remove this section)*
> Example:
> ![Screenshot](https://your-screenshot-link.com)

---

## 🛠️ Tech Stack

* ⚛️ **React** + **TypeScript**
* 🧭 **React Flow** – for visual node graphs
* 🎯 **Dagre.js** – for layouting DAG nodes
* 🎨 **Tailwind CSS** – clean UI styling
* 🔧 **Lucide Icons** – minimal icon set

---

## 📂 Project Structure

```
src/
├── components/        # CustomNode, Toolbar, StatsView, etc.
├── utills/            # DAG validation, autoLayout, initial data
├── types/             # Shared types and enums
├── Editor.tsx         # Main DAG editor view
├── App.tsx            # App entry
```

---

## 🧪 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/harimouli/pipeline-editor.git

# 2. Navigate into the project
cd pipeline-editor

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then visit **[http://localhost:5173](http://localhost:5173)** to explore the editor.

---

## ✨ About the Creator

Made with 💻 by **Hari Mouli Muthyala** aka **MouliTheMachine**
📧 Email: [harimoulimuthyala@gmail.com](mailto:harimoulimuthyala@gmail.com)
🔗 GitHub: [@harimouli](https://github.com/harimouli)

---

## 📄 License

Licensed under the [MIT License](LICENSE)
