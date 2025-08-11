<template>
  <div class="py-8 px-6">
    <div class="mx-auto w-full max-w-6xl">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">Projects</h1>
        <button @click="openCreateModal" class="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">
          + New Project
        </button>
      </div>

      <transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-white/20 backdrop-blur-xl" @click.self="closeModal"></div>

          <div class="relative w-full max-w-md p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              {{ isEdit ? 'Edit Project' : 'Create Project' }}
            </h2>

            <input v-model="form.name" placeholder="Project name" class="w-full p-3 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-blue-300 mb-3" />
            <textarea v-model="form.description" placeholder="Description (optional)" rows="3" class="w-full p-3 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-blue-300"></textarea>

            <div class="flex justify-end gap-3 mt-4">
              <button @click="closeModal" class="px-4 py-2 rounded-lg bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70 transition">Cancel</button>
              <button @click="saveProject" class="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition">
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="modal-fade">
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-white/20 backdrop-blur-xl" @click.self="closeDelete"></div>

          <div class="relative w-full max-w-sm p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800">Delete Project</h3>
            <p class="text-gray-600 mt-2">
              Are you sure you want to delete "<span class="font-medium">{{ selectedProject?.name }}</span>"?
            </p>

            <div class="flex justify-end gap-3 mt-6">
              <button @click="closeDelete" class="px-4 py-2 rounded-lg bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70 transition">Cancel</button>
              <button @click="confirmDelete" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      </transition>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="p in store.projects" :key="p.id" @click="selectProject(p)" class="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ p.name || 'Untitled project' }}</h3>
            <p class="mt-2 text-sm text-gray-500">{{ p.description || 'No description' }}</p>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs text-gray-400">ID: {{ p.id }}</span>
            <div class="flex gap-2">
              <button @click.stop="openEditModal(p)" class="px-2 py-1 rounded-md bg-yellow-300 text-white text-sm hover:bg-yellow-400">Edit</button>
              <button @click.stop="openDeleteModal(p)" class="px-2 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>

        <div v-if="!store.loading && store.projects.length === 0" class="col-span-full text-center py-10 text-gray-500">
          No projects yet — create your first project ✨
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProjectsStore } from '@/stores/projects.store';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const router = useRouter();
  const store = useProjectsStore();

  const showModal = ref(false);
  const isEdit = ref(false);
  const form = reactive({ id: null, name: '', description: '' });

  const showDeleteModal = ref(false);
  const selectedProject = ref(null);

  onMounted(() => store.fetchProjects().catch(() => toast.error('Failed to load projects')));

  function openCreateModal() {
    isEdit.value = false;
    Object.assign(form, { id: null, name: '', description: '' });
    showModal.value = true;
  }

  function openEditModal(project) {
    isEdit.value = true;
    Object.assign(form, project);
    showModal.value = true;
  }

  function closeModal() {
    showModal.value = false;
  }

  async function saveProject() {
    if (!form.name.trim()) return toast.error('Project name is required');

    if (isEdit.value) {
      const original = store.projects.find(p => p.id === form.id);
      if (
          original &&
          original.name.trim() === form.name.trim() &&
          (original.description || '').trim() === (form.description || '').trim()
      ) {
        toast.info('No changes detected');
        return;
      }

      try {
        await store.updateProject(form.id, {
          name: form.name,
          description: form.description
        });
        toast.success('Project updated');
      } catch {
        toast.error('Something went wrong');
      }
    }
    else {
      try {
        await store.createProject({ name: form.name, description: form.description });
        toast.success('Project created');
      } catch {
        toast.error('Something went wrong');
      }
    }

    closeModal();
  }

  function openDeleteModal(project) {
    selectedProject.value = project;
    showDeleteModal.value = true;
  }

  function closeDelete() {
    showDeleteModal.value = false;
    selectedProject.value = null;
  }

  async function confirmDelete() {
    if (!selectedProject.value) return;
    try {
      await store.deleteProject(selectedProject.value.id);
      toast.success('Project deleted');
    } catch {
      toast.error('Could not delete project');
    } finally {
      closeDelete();
    }
  }

  function selectProject(project) {
    store.setActiveProject(project);
    router.push({ name: 'Dashboard' });
  }
</script>

<style scoped>
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: all 180ms ease;
  }
  .modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.98);
  }
</style>
