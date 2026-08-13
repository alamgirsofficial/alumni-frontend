<script setup>
import { ref } from "vue";
import { Eye } from "@lucide/vue";
import MemberDetailsModal from "./MemberDetailsModal.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },

  members: {
    type: Array,
    required: true,
  },

  headerColor: {
    type: String,
    default: "bg-blue-100",
  },
});

const selectedMember = ref(null);

const openModal = (member) => {
  selectedMember.value = member;
};

const closeModal = () => {
  selectedMember.value = null;
};
</script>

<template>
  <section class="mb-10">
    <!-- Section Title -->
    <div class="mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-white">
        {{ title }}
      </h2>

      <div
        class="mt-3 w-16 h-1 rounded-full bg-linear-to-r from-blue-500 to-cyan-400"
      ></div>
    </div>

    <!-- Table Wrapper -->
    <!-- Desktop Table -->
<div
    class="
        hidden sm:block
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-xl shadow-black/10
    "
>
    <table class="w-full text-left">

        <!-- Header -->
        <thead class="bg-blue-500/10">
            <tr>
                <th
                    class="
                        px-5 py-4
                        text-xs
                        font-semibold
                        text-cyan-300
                        uppercase
                        tracking-wide
                        w-16
                    "
                >
                    #
                </th>

                <th
                    class="
                        px-5 py-4
                        text-xs
                        font-semibold
                        text-cyan-300
                        uppercase
                        tracking-wide
                    "
                >
                    Name
                </th>

                <th
                    class="
                        px-5 py-4
                        text-xs
                        font-semibold
                        text-cyan-300
                        uppercase
                        tracking-wide
                    "
                >
                    Designation
                </th>

                <th
                    class="
                        px-5 py-4
                        text-center
                        text-xs
                        font-semibold
                        text-cyan-300
                        uppercase
                        tracking-wide
                        w-24
                    "
                >
                    Action
                </th>
            </tr>
        </thead>

        <!-- Body -->
        <tbody>

            <tr
                v-for="(member, index) in members"
                :key="member.id"
                class="
                    border-t border-white/5
                    hover:bg-white/5
                    transition-all duration-300
                    group
                "
            >

                <td class="px-5 py-4 text-sm text-gray-500">
                    {{ String(index + 1).padStart(2, '0') }}
                </td>

                <td class="px-5 py-4">
                    <span
                        class="
                            font-medium
                            text-gray-200
                            group-hover:text-white
                            transition-colors
                        "
                    >
                        {{ member.name }}
                    </span>
                </td>

                <td
                    class="
                        px-5 py-4
                        text-sm
                        text-gray-400
                        group-hover:text-gray-300
                        transition-colors
                    "
                >
                    {{ member.designation }}
                </td>

                <td class="px-5 py-4">
                    <div class="flex justify-center">

                        <button
                            @click="openModal(member)"
                            type="button"
                            title="View Details"
                            class="
                                w-9 h-9
                                flex items-center justify-center
                                rounded-xl
                                bg-cyan-400/10
                                border border-cyan-400/20
                                text-cyan-400

                                hover:bg-cyan-400
                                hover:text-slate-950
                                hover:border-cyan-400
                                hover:shadow-lg
                                hover:shadow-cyan-500/20

                                transition-all duration-300
                            "
                        >
                            <Eye :size="17" />
                        </button>

                    </div>
                </td>

            </tr>

        </tbody>

    </table>
</div>
<!-- Mobile Cards -->
<div class="sm:hidden space-y-3">

    <div
        v-for="(member, index) in members"
        :key="member.id"
        class="
            relative
            p-4
            rounded-2xl

            bg-white/5
            backdrop-blur-xl

            border border-white/10

            hover:border-cyan-400/20
            hover:bg-white/10

            transition-all duration-300
        "
    >

        <!-- Top -->
        <div class="flex items-center justify-between">

            <span
                class="
                    text-xs
                    font-semibold
                    text-cyan-400
                    tracking-wider
                "
            >
                {{ String(index + 1).padStart(2, '0') }}
            </span>

            <button
                @click="openModal(member)"
                type="button"
                class="
                    w-9 h-9
                    flex items-center justify-center
                    rounded-xl

                    bg-cyan-400/10
                    border border-cyan-400/20

                    text-cyan-400

                    hover:bg-cyan-400
                    hover:text-slate-950

                    transition-all duration-300
                "
            >
                <Eye :size="17" />
            </button>

        </div>


        <!-- Name -->
        <h3
            class="
                mt-3
                text-base
                font-semibold
                text-white
            "
        >
            {{ member.name }}
        </h3>


        <!-- Designation -->
        <p
            class="
                mt-1
                text-sm
                text-gray-400
            "
        >
            {{ member.designation }}
        </p>

    </div>


    <!-- Empty -->
    <div
        v-if="!members.length"
        class="
            py-10
            text-center
            text-sm
            text-gray-500
        "
    >
        No data available
    </div>

</div>

    <!-- Modal -->
    <MemberDetailsModal
      v-if="selectedMember"
      :member="selectedMember"
      @close="closeModal"
    />
  </section>
</template>
