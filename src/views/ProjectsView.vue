<template>
  <div class="py-8 px-6 relative">
    <div class="mx-auto w-full max-w-6xl">
      <div
        v-if="projectsStore.loading"
        class="fixed inset-0 flex items-center justify-center bg-white/80 z-50"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
        ></div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">Projects</h1>
        <button
          @click="openModal()"
          class="p-3 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition"
          title="New Project"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div v-if="projectsStore.error" class="text-center py-10 text-red-500">
        {{ projectsStore.error }}
      </div>

      <div
        v-else-if="!projectsStore.projects.length && !projectsStore.loading"
        class="flex items-center justify-center py-20 text-gray-500 text-lg"
      >
        No projects yet — create your first one ✨
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="p in projectsStore.projects"
          :key="p.id"
          class="p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ p.name }}</h3>
            <p v-if="p.description" class="mt-2 text-sm text-gray-500">
              {{ p.description }}
            </p>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs text-gray-400">ID: {{ p.id }}</span>
            <div class="flex gap-2">
              <button
                @click="openModal(p)"
                class="p-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                title="Edit"
              >
                <i class="fas fa-pen"></i>
              </button>

              <button
                @click="openDeleteModal(p)"
                class="p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                title="Delete"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <transition name="modal-premium">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-md" @click.self="closeModal"></div>
          <div
            class="relative w-full max-w-md p-6 rounded-2xl bg-white border border-gray-200 shadow-xl"
          >
            <h2 class="text-xl font-semibold mb-4">
              {{ isEdit ? 'Edit Project' : 'Create Project' }}
            </h2>

            <input
              v-model="form.name"
              placeholder="Project name"
              class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 mb-3"
            />
            <textarea
              v-model="form.description"
              placeholder="Description (optional)"
              rows="3"
              class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <div class="flex justify-end gap-3 mt-4">
              <button
                @click="closeModal"
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                @click="saveProject"
                class="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="modal-premium">
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-md"
            @click.self="closeDelete"
          ></div>
          <div
            class="relative w-full max-w-sm p-6 rounded-2xl bg-white border border-gray-200 shadow-xl"
          >
            <h3 class="text-lg font-semibold">Delete Project</h3>
            <p class="text-gray-600 mt-2">
              Are you sure you want to delete "<span class="font-medium">{{
                selectedProject?.name
              }}</span
              >"?
            </p>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="closeDelete"
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects.store'

const projectsStore = useProjectsStore()

const showModal = ref(false)
const showDeleteModal = ref(false)
const isEdit = ref(false)

const form = reactive({ id: null, name: '', description: '' })
const selectedProject = ref(null)

onMounted(() => projectsStore.fetchProjects())

function openModal(project = null) {
  isEdit.value = !!project
  Object.assign(form, project || { id: null, name: '', description: '' })
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}

async function saveProject() {
  const payload = { name: form.name, description: form.description }
  const ok = await projectsStore.saveProject(payload, isEdit.value, form.id)
  if (ok) closeModal()
}

function openDeleteModal(project) {
  selectedProject.value = project
  showDeleteModal.value = true
}
function closeDelete() {
  showDeleteModal.value = false
  selectedProject.value = null
}
async function confirmDelete() {
  if (!selectedProject.value) return
  await projectsStore.deleteProject(selectedProject.value.id)
  closeDelete()
}
</script>

<style scoped>
.modal-premium-enter-active,
.modal-premium-leave-active {
  transition: all 200ms ease;
}
.modal-premium-enter-from,
.modal-premium-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
