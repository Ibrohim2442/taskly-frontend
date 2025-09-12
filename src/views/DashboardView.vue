<template>
  <main class="flex-1 overflow-auto p-4 sm:p-6 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- Loading Overlay -->
      <div
        v-if="pageLoading"
        class="fixed inset-0 flex items-center justify-center bg-white/80 z-50"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
        ></div>
      </div>

      <!-- Project Selector -->
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

      <!-- Board Selector -->
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

      <!-- Kanban Board -->
      <div
        v-if="boardsStore.activeBoardId"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="status in statuses"
          :key="status.id"
          class="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col"
        >
          <!-- Column Header -->
          <div class="flex items-center justify-between mb-4">
            <div v-if="editingStatusId === status.id" class="flex gap-2 flex-1">
              <input
                v-model="status.name"
                class="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-0"
              />
              <button
                @click="stopEditingStatus"
                class="px-3 py-2 bg-green-500 text-white rounded-lg"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
            <h2 v-else class="flex items-center text-lg font-semibold text-gray-800">
              <span class="inline-block w-3 h-3 rounded-full mr-2" :class="status.color"></span>
              {{ status.name }}
            </h2>

            <div class="flex gap-2" v-if="editingStatusId !== status.id">
              <button
                @click="startEditingStatus(status.id)"
                class="text-gray-400 hover:text-green-500"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteStatus(status)" class="text-gray-400 hover:text-red-500">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <!-- Tasks inside column -->
          <draggable
            v-model="status.cards"
            group="kanban"
            item-key="id"
            class="flex-1 space-y-3 min-h-[100px]"
          >
            <template #item="{ element }">
              <div class="p-3 bg-white rounded-lg shadow-sm flex justify-between items-center">
                <div v-if="editingCardId === element.id" class="flex gap-2 flex-1">
                  <input
                    v-model="element.title"
                    class="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200"
                  />
                  <button
                    @click="stopEditingCard"
                    class="px-3 py-2 bg-green-500 text-white rounded-lg"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
                <div v-else class="flex-1 flex justify-between items-center">
                  <span>{{ element.title }}</span>
                  <div class="flex gap-2">
                    <button
                      @click="startEditingCard(element.id)"
                      class="text-gray-400 hover:text-green-500"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="deleteCard(status, element)"
                      class="text-gray-400 hover:text-red-500"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </draggable>

          <!-- Add New Task Button -->
          <button
            @click="addCard(status)"
            class="mt-3 w-full flex items-center justify-center py-2 rounded-lg border border-dashed border-gray-300 text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <i class="fas fa-plus text-lg"></i>
          </button>
        </div>

        <!-- Add New Column Button -->
        <div
          class="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition"
          @click="addStatus"
        >
          <i class="fas fa-plus text-2xl"></i>
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

      <!-- Delete Board Modal -->
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
import draggable from 'vuedraggable'

const projectsStore = useProjectsStore()
const boardsStore = useBoardsStore()

const activeProjectId = ref('')

// Page loading state
const pageLoading = ref(true)

const showBoardModal = ref(false)
const isEditBoard = ref(false)
const boardForm = reactive({ id: null, name: '', description: '', project_id: null })

const showDeleteModal = ref(false)
const selectedBoard = ref(null)

onMounted(async () => {
  await projectsStore.fetchProjects()
  pageLoading.value = false
})

watch(activeProjectId, async (newVal) => {
  if (newVal) {
    pageLoading.value = true
    await boardsStore.fetchBoards(newVal)
    pageLoading.value = false
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

// Demo Kanban data
const statuses = ref([
  { id: 1, name: 'To Do', color: 'bg-gray-400', cards: [{ id: 'c1', title: 'Sample Task 1' }] },
  {
    id: 2,
    name: 'In Progress',
    color: 'bg-blue-400',
    cards: [{ id: 'c2', title: 'Sample Task 2' }],
  },
  { id: 3, name: 'Done', color: 'bg-teal-500', cards: [{ id: 'c3', title: 'Sample Task 3' }] },
])

const editingStatusId = ref(null)
const editingCardId = ref(null)

function addCard(status) {
  status.cards.push({ id: Date.now().toString(), title: `New Task ${status.cards.length + 1}` })
}

function deleteCard(status, card) {
  status.cards = status.cards.filter((c) => c.id !== card.id)
}

function addStatus() {
  statuses.value.push({
    id: Date.now(),
    name: `New Column ${statuses.value.length + 1}`,
    color: 'bg-gray-400',
    cards: [],
  })
}

function deleteStatus(status) {
  statuses.value = statuses.value.filter((s) => s.id !== status.id)
}

function startEditingStatus(id) {
  editingStatusId.value = id
}

function stopEditingStatus() {
  editingStatusId.value = null
}

function startEditingCard(id) {
  editingCardId.value = id
}

function stopEditingCard() {
  editingCardId.value = null
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
