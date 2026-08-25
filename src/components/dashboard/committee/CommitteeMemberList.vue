<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import Pagination from "@/components/common/Pagination.vue";

import {
    Plus,
    Search,
    SlidersHorizontal,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Users,
    UserRound,
    UserCog,
    X,
    Archive,
    CheckCircle2,
} from "@lucide/vue";

import {
    getCommittees,
    deleteCommitteeMember,
} from "@/composables/committeeService";

import { useToast } from "@/composables/useToast";

const route = useRoute();
const router = useRouter();

const { success, warning, error } = useToast();

// =====================================================
// State
// =====================================================

const committees = ref([]);

const search = ref("");
const selectedType = ref("all");

const currentPage = ref(1);
const perPage = 10;

const loading = ref(false);

const showDeleteModal = ref(false);
const deletingMember = ref(null);

// =====================================================
// Committee Types
// =====================================================

const committeeTypes = [
    {
        value: "advisors",
        label: "উপদেষ্টা মণ্ডলী",
        shortLabel: "উপদেষ্টা",
        icon: UserRound,
    },
    {
        value: "executiveCommittee",
        label: "কার্যনির্বাহী কমিটি",
        shortLabel: "কার্যনির্বাহী",
        icon: UserCog,
    },
    {
        value: "members",
        label: "সদস্যবৃন্দ",
        shortLabel: "সদস্য",
        icon: Users,
    },
];

// =====================================================
// Load
// =====================================================

const loadCommittees = async () => {
    loading.value = true;

    try {
        committees.value = await getCommittees();
    } catch (err) {
        console.error(err);
        error("Failed to load committee data.");
    } finally {
        loading.value = false;
    }
};

onMounted(loadCommittees);

// =====================================================
// Selected Committee
// =====================================================

const selectedCommittee = computed(() => {
    return committees.value.find(
        (committee) =>
            String(committee.id) ===
            String(route.params.committeeId)
    );
});

// =====================================================
// Status
// =====================================================

const getCommitteeStatus = (committee) => {
    if (committee?.status) {
        return committee.status;
    }

    if (!committees.value.length) {
        return "archived";
    }

    const latestCommittee = [...committees.value].sort(
        (a, b) => Number(b.id) - Number(a.id)
    )[0];

    return String(committee.id) === String(latestCommittee?.id)
        ? "active"
        : "archived";
};

const isActiveCommittee = computed(() => {
    if (!selectedCommittee.value) {
        return false;
    }

    return (
        getCommitteeStatus(selectedCommittee.value) ===
        "active"
    );
});

// =====================================================
// Members
// =====================================================

const allMembers = computed(() => {
    const committee = selectedCommittee.value;

    if (!committee) {
        return [];
    }

    const data = [];

    committeeTypes.forEach((type) => {
        const members = committee[type.value] || [];

        members.forEach((member) => {
            data.push({
                ...member,
                committeeId: committee.id,
                year: committee.year,
                type: type.value,
                typeLabel: type.label,
                typeShortLabel: type.shortLabel,
            });
        });
    });

    return data;
});

// =====================================================
// Statistics
// =====================================================

const advisorCount = computed(() => {
    return selectedCommittee.value?.advisors?.length || 0;
});

const executiveCount = computed(() => {
    return (
        selectedCommittee.value?.executiveCommittee?.length ||
        0
    );
});

const memberCount = computed(() => {
    return selectedCommittee.value?.members?.length || 0;
});

// =====================================================
// Filter
// =====================================================

const filteredMembers = computed(() => {
    const keyword = search.value.trim().toLowerCase();

    return allMembers.value.filter((member) => {
        const matchesSearch =
            !keyword ||
            member.name?.toLowerCase().includes(keyword) ||
            member.designation?.toLowerCase().includes(keyword) ||
            member.mobile?.toLowerCase().includes(keyword);

        const matchesType =
            selectedType.value === "all" ||
            member.type === selectedType.value;

        return matchesSearch && matchesType;
    });
});

// =====================================================
// Pagination
// =====================================================

const totalPages = computed(() => {
    return Math.max(
        1,
        Math.ceil(filteredMembers.value.length / perPage)
    );
});

const paginatedMembers = computed(() => {
    const start = (currentPage.value - 1) * perPage;

    return filteredMembers.value.slice(
        start,
        start + perPage
    );
});

const startItem = computed(() => {
    if (!filteredMembers.value.length) {
        return 0;
    }

    return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
    return Math.min(
        currentPage.value * perPage,
        filteredMembers.value.length
    );
});

// =====================================================
// Filters
// =====================================================

const resetPage = () => {
    currentPage.value = 1;
};

const clearFilters = () => {
    search.value = "";
    selectedType.value = "all";

    resetPage();
};

// =====================================================
// Add Member
// =====================================================

const addMember = () => {
    if (!selectedCommittee.value) {
        return;
    }

    if (!isActiveCommittee.value) {
        warning(
            "Archived committee members cannot be added."
        );

        return;
    }

    router.push({
        name: "CommitteeCreate",
        params: {
            committeeId: selectedCommittee.value.id,
        },
    });
};

// =====================================================
// Edit
// =====================================================

const editMember = (member) => {
    if (!isActiveCommittee.value) {
        warning(
            "Archived committee members cannot be edited."
        );

        return;
    }

    router.push({
        name: "CommitteeEdit",
        params: {
            committeeId: member.committeeId,
            type: member.type,
            memberId: member.id,
        },
    });
};

// =====================================================
// Delete
// =====================================================

const confirmDelete = (member) => {
    if (!isActiveCommittee.value) {
        warning(
            "Archived committee members cannot be deleted."
        );

        return;
    }

    deletingMember.value = member;
    showDeleteModal.value = true;
};

const cancelDelete = () => {
    deletingMember.value = null;
    showDeleteModal.value = false;
};

const handleDelete = async () => {
    if (!deletingMember.value) {
        return;
    }

    try {
        await deleteCommitteeMember({
            committeeId:
                deletingMember.value.committeeId,

            type: deletingMember.value.type,

            memberId: deletingMember.value.id,
        });

        success(
            "Committee member deleted successfully."
        );

        await loadCommittees();

        cancelDelete();

        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value;
        }
    } catch (err) {
        console.error(err);
        error(
            "Failed to delete committee member."
        );
    }
};

// =====================================================
// Initials
// =====================================================

const getInitials = (name) => {
    if (!name) {
        return "?";
    }

    return name
        .split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
};
</script>

<template>
    <div class="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">

        <!-- ================================================= -->
        <!-- Header -->
        <!-- ================================================= -->

        <section
            class="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-6 lg:p-7"
        >
            <div
                class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
            ></div>

            <div
                class="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            >
                <div class="flex items-start gap-4">

                    <div
                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20"
                    >
                        <Users :size="23" />
                    </div>

                    <div>
                        <div
                            class="flex flex-wrap items-center gap-2"
                        >
                            <h1
                                class="text-xl font-bold tracking-tight text-white sm:text-2xl"
                            >
                                Committee Members
                            </h1>

                            <span
                                v-if="selectedCommittee"
                                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                                :class="
                                    isActiveCommittee
                                        ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                                        : 'bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20'
                                "
                            >
                                <span
                                    class="h-1.5 w-1.5 rounded-full"
                                    :class="
                                        isActiveCommittee
                                            ? 'bg-emerald-400'
                                            : 'bg-slate-500'
                                    "
                                ></span>

                                {{
                                    isActiveCommittee
                                        ? "চলমান"
                                        : "আর্কাইভ"
                                }}
                            </span>
                        </div>

                        <p
                            v-if="selectedCommittee"
                            class="mt-1.5 text-sm text-slate-400"
                        >
                            {{ selectedCommittee.year }}
                            Committee-এর সদস্য তালিকা
                        </p>

                        <p
                            v-else-if="!loading"
                            class="mt-1.5 text-sm text-red-400"
                        >
                            Committee not found.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-2 sm:flex-row">

                    <RouterLink
                        :to="{ name: 'CommitteeList' }"
                        class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                        <ChevronLeft :size="17" />
                        Committees
                    </RouterLink>

                    <RouterLink
                        v-if="isActiveCommittee"
                        type="button"
                       :to="{ name: 'CommitteeCreate' }"
                        class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400"
                    >
                        <Plus :size="18" />
                        Add Member
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Archive Notice -->
        <!-- ================================================= -->

        <section
            v-if="selectedCommittee && !isActiveCommittee"
            class="flex items-start gap-3 rounded-2xl border border-slate-500/10 bg-slate-500/5 p-4"
        >
            <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400"
            >
                <Archive :size="18" />
            </div>

            <div>
                <p
                    class="text-sm font-semibold text-slate-300"
                >
                    Archived Committee — Read Only
                </p>

                <p
                    class="mt-1 text-xs leading-5 text-slate-500"
                >
                    এই Committee বর্তমানে archive হিসেবে সংরক্ষিত।
                    এর member information শুধুমাত্র দেখা যাবে।
                    Edit, Delete অথবা নতুন member যোগ করা যাবে না।
                </p>
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Active Notice -->
        <!-- ================================================= -->

        <section
            v-if="selectedCommittee && isActiveCommittee"
            class="flex items-start gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4"
        >
            <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
            >
                <CheckCircle2 :size="18" />
            </div>

            <div>
                <p
                    class="text-sm font-semibold text-emerald-300"
                >
                    Active Committee
                </p>

                <p
                    class="mt-1 text-xs leading-5 text-slate-500"
                >
                    এই Committee বর্তমানে চলমান।
                    Member information প্রয়োজন অনুযায়ী add, edit এবং delete করা যাবে।
                </p>
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Stats -->
        <!-- ================================================= -->

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
                <p
                    class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                >
                    Total Members
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                    {{ allMembers.length }}
                </p>
            </div>

            <div
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center gap-3">
                    <UserRound
                        :size="18"
                        class="text-cyan-400"
                    />

                    <p
                        class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        Advisors
                    </p>
                </div>

                <p class="mt-2 text-2xl font-bold text-white">
                    {{ advisorCount }}
                </p>
            </div>

            <div
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center gap-3">
                    <UserCog
                        :size="18"
                        class="text-cyan-400"
                    />

                    <p
                        class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        Executive
                    </p>
                </div>

                <p class="mt-2 text-2xl font-bold text-white">
                    {{ executiveCount }}
                </p>
            </div>

            <div
                class="rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center gap-3">
                    <Users
                        :size="18"
                        class="text-cyan-400"
                    />

                    <p
                        class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        Members
                    </p>
                </div>

                <p class="mt-2 text-2xl font-bold text-cyan-400">
                    {{ memberCount }}
                </p>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Filters -->
        <!-- ================================================= -->

        <section
            class="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
        >
            <div class="mb-4 flex items-center gap-2">
                <SlidersHorizontal
                    :size="18"
                    class="text-cyan-400"
                />

                <h2 class="text-sm font-semibold text-white">
                    Search & Filter Members
                </h2>
            </div>

            <div class="grid gap-3 md:grid-cols-3">

                <div class="relative md:col-span-2">
                    <Search
                        :size="18"
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        v-model="search"
                        @input="resetPage"
                        type="text"
                        placeholder="Search by name, designation or mobile..."
                        class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                    />
                </div>

                <select
                    v-model="selectedType"
                    @change="resetPage"
                    class="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none focus:border-cyan-500/50"
                >
                    <option value="all">
                        All Types
                    </option>

                    <option
                        v-for="type in committeeTypes"
                        :key="type.value"
                        :value="type.value"
                    >
                        {{ type.label }}
                    </option>
                </select>
            </div>

            <button
                v-if="search || selectedType !== 'all'"
                type="button"
                @click="clearFilters"
                class="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <X :size="14" />
                Clear filters
            </button>
        </section>

        <!-- ================================================= -->
        <!-- Table -->
        <!-- ================================================= -->

        <section
            class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
        >
            <div
                class="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h2
                        class="text-sm font-semibold text-white"
                    >
                        {{ selectedCommittee?.year || "Committee" }}
                        Members
                    </h2>

                    <p
                        class="mt-1 text-xs text-slate-500"
                    >
                        Showing {{ filteredMembers.length }}
                        member{{ filteredMembers.length !== 1 ? "s" : "" }}
                    </p>
                </div>

                <span
                    class="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold"
                    :class="
                        isActiveCommittee
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-500/10 text-slate-500'
                    "
                >
                    <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="
                            isActiveCommittee
                                ? 'bg-emerald-400'
                                : 'bg-slate-500'
                        "
                    ></span>

                    {{
                        isActiveCommittee
                            ? "Editing Enabled"
                            : "Read Only"
                    }}
                </span>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full text-left">
                    <thead
                        class="border-b border-white/10 bg-white/[0.025]"
                    >
                        <tr>
                            <th
                                class="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                            >
                                Member
                            </th>

                            <th
                                class="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                            >
                                Type
                            </th>

                            <th
                                class="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                            >
                                Designation
                            </th>

                            <th
                                class="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                            >
                                Mobile
                            </th>

                            <th
                                class="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody
                        class="divide-y divide-white/5"
                    >
                        <tr
                            v-for="member in paginatedMembers"
                            :key="`${member.committeeId}-${member.type}-${member.id}`"
                            class="transition hover:bg-white/[0.02]"
                        >
                            <!-- Member -->
                            <td class="px-5 py-4">
                                <div
                                    class="flex items-center gap-3"
                                >
                                    <div
                                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-400"
                                    >
                                        {{ getInitials(member.name) }}
                                    </div>

                                    <div class="min-w-0">
                                        <p
                                            class="truncate text-sm font-semibold text-white"
                                        >
                                            {{ member.name }}
                                        </p>

                                        <p
                                            class="mt-0.5 text-[10px] text-slate-600"
                                        >
                                            ID #{{ member.id }}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <!-- Type -->
                            <td class="px-5 py-4">
                                <span
                                    class="inline-flex rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-400"
                                >
                                    {{ member.typeLabel }}
                                </span>
                            </td>

                            <!-- Designation -->
                            <td
                                class="px-5 py-4 text-sm text-slate-300"
                            >
                                {{ member.designation || "—" }}
                            </td>

                            <!-- Mobile -->
                            <td
                                class="px-5 py-4 text-sm text-slate-400"
                            >
                                {{ member.mobile || "—" }}
                            </td>

                            <!-- Actions -->
                            <td class="px-5 py-4">
                                <div
                                    class="flex justify-end gap-2"
                                >

                                    <!-- Active -->
                                    <template
                                        v-if="isActiveCommittee"
                                    >
                                        <button
                                            type="button"
                                            @click="editMember(member)"
                                            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                                            title="Edit member"
                                        >
                                            <Pencil
                                                :size="15"
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            @click="confirmDelete(member)"
                                            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                                            title="Delete member"
                                        >
                                            <Trash2
                                                :size="15"
                                            />
                                        </button>
                                    </template>

                                    <!-- Archived -->
                                    <span
                                        v-else
                                        class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 text-[10px] font-semibold text-slate-600"
                                    >
                                        <Archive
                                            :size="13"
                                        />

                                        Read Only
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <!-- Empty -->
                        <tr
                            v-if="
                                !loading &&
                                !paginatedMembers.length
                            "
                        >
                            <td
                                colspan="5"
                                class="px-5 py-16 text-center"
                            >
                                <Users
                                    :size="34"
                                    class="mx-auto text-slate-600"
                                />

                                <p
                                    class="mt-3 text-sm font-medium text-slate-400"
                                >
                                    No committee member found.
                                </p>

                                <p
                                    class="mt-1 text-xs text-slate-600"
                                >
                                    Try changing your search
                                    or filter.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div
                v-if="filteredMembers.length"
                class="border-t border-white/10 px-5 py-4"
            >
                <Pagination
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    :start-item="startItem"
                    :end-item="endItem"
                    :total-items="filteredMembers.length"
                    @update:current-page="
                        currentPage = $event
                    "
                />
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Delete Modal -->
        <!-- ================================================= -->

        <Teleport to="body">
            <div
                v-if="showDeleteModal"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            >
                <div
                    class="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
                >
                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400"
                    >
                        <Trash2 :size="20" />
                    </div>

                    <h3
                        class="mt-4 text-lg font-bold text-white"
                    >
                        Delete Committee Member?
                    </h3>

                    <p
                        class="mt-2 text-sm leading-6 text-slate-400"
                    >
                        তুমি কি
                        <span
                            class="font-semibold text-white"
                        >
                            {{ deletingMember?.name }}
                        </span>
                        কে
                        <span
                            class="font-semibold text-cyan-400"
                        >
                            {{ selectedCommittee?.year }}
                        </span>
                        Committee থেকে delete করতে চাও?
                    </p>

                    <div
                        class="mt-3 rounded-xl border border-red-500/10 bg-red-500/5 p-3"
                    >
                        <p
                            class="text-xs leading-5 text-red-300/70"
                        >
                            এই action শুধুমাত্র Active Committee-এর
                            member-এর ক্ষেত্রে প্রযোজ্য।
                        </p>
                    </div>

                    <div
                        class="mt-6 flex justify-end gap-3"
                    >
                        <button
                            type="button"
                            @click="cancelDelete"
                            class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            @click="handleDelete"
                            class="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
                        >
                            Delete Member
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>