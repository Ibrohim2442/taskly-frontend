<template>
  <main class="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- Project Select -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
        <select
          v-model="activeProjectId"
          class="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select Project</option>
          <option v-for="p in projectsStore.projects" :key="p.id" :value="p.id">
            {{ p.name }}
          </option>
        </select>
      </div>

      <!-- Board Select -->
      <div v-if="activeProjectId" class="mb-6">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700">Select Board</label>
          <button
            @click="openBoardModal()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
          >
            + New Board
          </button>
        </div>

        <div class="flex items-center gap-3 mt-2">
          <select
            v-model="boardsStore.activeBoardId"
            class="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Select Board</option>
            <option v-for="b in boardsStore.boards" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>

          <!-- Edit/Delete -->
          <button
            v-if="boardsStore.activeBoardId"
            @click="openBoardModal(boardsStore.activeBoard)"
            class="px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Edit
          </button>
          <button
            v-if="boardsStore.activeBoardId"
            @click="openDeleteModal(boardsStore.activeBoard)"
            class="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- Kanban (demo) -->
      <div
        v-if="boardsStore.activeBoardId"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <!-- To Do -->
        <div>
          <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-800">
            <span class="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
            To Do
          </h2>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p class="text-sm font-medium text-gray-800">Sample Task 1</p>
            </div>
          </div>
        </div>

        <!-- In Progress -->
        <div>
          <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-800">
            <span class="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
            In Progress
          </h2>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p class="text-sm font-medium text-gray-800">Sample Task 2</p>
            </div>
          </div>
        </div>

        <!-- Done -->
        <div>
          <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-800">
            <span class="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
            Done
          </h2>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-sm font-medium text-gray-800">Sample Task 3</p>
          </div>
        </div>
      </div>

      <!-- Create/Edit Board Modal -->
      <transition name="modal-premium">
        <div v-if="showBoardModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-md"
            @click.self="closeBoardModal"
          ></div>
          <div
            class="relative w-full max-w-md p-6 rounded-2xl bg-white border border-gray-200 shadow-xl"
          >
            <h2 class="text-xl font-semibold mb-4">
              {{ isEditBoard ? 'Edit Board' : 'Create Board' }}
            </h2>

            <input
              v-model="boardForm.name"
              placeholder="Board name"
              class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 mb-3"
            />
            <textarea
              v-model="boardForm.description"
              placeholder="Description (optional)"
              rows="3"
              class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <div class="flex justify-end gap-3 mt-4">
              <button
                @click="closeBoardModal"
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                @click="saveBoard"
                class="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {{ isEditBoard ? 'Update' : 'Create' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete Modal -->
      <transition name="modal-premium">
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-md"
            @click.self="closeDeleteModal"
          ></div>
          <div
            class="relative w-full max-w-sm p-6 rounded-2xl bg-white border border-gray-200 shadow-xl"
          >
            <h3 class="text-lg font-semibold">Delete Board</h3>
            <p class="text-gray-600 mt-2">
              Are you sure you want to delete "<span class="font-medium">{{
                selectedBoard?.name
              }}</span
              >"?
            </p>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="closeDeleteModal"
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
  </main>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects.store'
import { useBoardsStore } from '@/stores/boards.store'
import { useToast } from 'vue-toastification'

const toast = useToast()
const projectsStore = useProjectsStore()
const boardsStore = useBoardsStore()

const activeProjectId = ref('')

// Board modal state
const showBoardModal = ref(false)
const isEditBoard = ref(false)
const boardForm = reactive({ id: null, name: '', description: '', project_id: null })

// Delete modal state
const showDeleteModal = ref(false)
const selectedBoard = ref(null)

onMounted(() => {
  projectsStore.fetchProjects()
})

watch(activeProjectId, async (newVal) => {
  if (newVal) {
    await boardsStore.fetchBoards(newVal)
  } else {
    boardsStore.reset()
  }
})

function openBoardModal(board = null) {
  isEditBoard.value = !!board
  Object.assign(
    boardForm,
    board || { id: null, name: '', description: '', project_id: activeProjectId.value }
  )
  showBoardModal.value = true
}

function closeBoardModal() {
  showBoardModal.value = false
}

async function saveBoard() {
  const payload = {
    name: boardForm.name,
    description: boardForm.description,
    project_id: activeProjectId.value,
  }
  const ok = await boardsStore.saveBoard(payload, isEditBoard.value, boardForm.id)
  if (ok) closeBoardModal()
}

function openDeleteModal(board) {
  selectedBoard.value = board
  showDeleteModal.value = true
}

function closeDeleteModal() {
  selectedBoard.value = null
  showDeleteModal.value = false
}

async function confirmDelete() {
  if (!selectedBoard.value) return
  await boardsStore.deleteBoard(selectedBoard.value.id)
  closeDeleteModal()
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
