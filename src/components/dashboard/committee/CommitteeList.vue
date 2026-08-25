<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import Pagination from "@/components/common/Pagination.vue";

import {
    Plus,
    Search,
    SlidersHorizontal,
    ChevronRight,
    Users,
    UserRound,
    UserCog,
    Archive,
    CheckCircle2,
    X,
} from "@lucide/vue";

import { getCommittees } from "@/composables/committeeService";
import { useToast } from "@/composables/useToast";

const router = useRouter();

const { error } = useToast();

// =====================================================
// State
// =====================================================

const committees = ref([]);

const search = ref("");
const selectedStatus = ref("all");

const loading = ref(false);

const currentPage = ref(1);
const perPage = 6;

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

const isActiveCommittee = (committee) => {
    return getCommitteeStatus(committee) === "active";
};

const statusLabel = (committee) => {
    return isActiveCommittee(committee) ? "চলমান" : "আর্কাইভ";
};

// =====================================================
// Statistics
// =====================================================

const getMemberCount = (committee, type) => {
    return (committee?.[type] || []).length;
};

const getTotalMembers = (committee) => {
    return committeeTypes.reduce((total, type) => {
        return total + getMemberCount(committee, type.value);
    }, 0);
};

const activeCommittee = computed(() => {
    return committees.value.find((committee) =>
        isActiveCommittee(committee)
    );
});

const activeMembersCount = computed(() => {
    if (!activeCommittee.value) {
        return 0;
    }

    return getTotalMembers(activeCommittee.value);
});

const archivedCount = computed(() => {
    return committees.value.filter(
        (committee) => !isActiveCommittee(committee)
    ).length;
});

// =====================================================
// Search + Filter
// =====================================================

const filteredCommittees = computed(() => {
    const keyword = search.value.trim().toLowerCase();

    return committees.value.filter((committee) => {
        const matchesSearch =
            !keyword ||
            committee.year?.toLowerCase().includes(keyword) ||
            committee.advisors?.some((member) =>
                member.name?.toLowerCase().includes(keyword)
            ) ||
            committee.executiveCommittee?.some((member) =>
                member.name?.toLowerCase().includes(keyword)
            ) ||
            committee.members?.some((member) =>
                member.name?.toLowerCase().includes(keyword)
            );

        const status = getCommitteeStatus(committee);

        const matchesStatus =
            selectedStatus.value === "all" ||
            status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    });
});

// =====================================================
// Pagination
// =====================================================

const totalPages = computed(() => {
    return Math.max(
        1,
        Math.ceil(filteredCommittees.value.length / perPage)
    );
});

const paginatedCommittees = computed(() => {
    const start = (currentPage.value - 1) * perPage;

    return filteredCommittees.value.slice(start, start + perPage);
});

const startItem = computed(() => {
    if (!filteredCommittees.value.length) {
        return 0;
    }

    return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
    return Math.min(
        currentPage.value * perPage,
        filteredCommittees.value.length
    );
});

const resetPage = () => {
    currentPage.value = 1;
};

const clearFilters = () => {
    search.value = "";
    selectedStatus.value = "all";
    resetPage();
};

// =====================================================
// View Members
// =====================================================

const viewCommitteeMembers = (committee) => {
    router.push({
        name: "CommitteeMemberList",
        params: {
            committeeId: committee.id,
        },
    });
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
                class="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl"
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
                        <div class="flex flex-wrap items-center gap-2">
                            <h1
                                class="text-xl font-bold tracking-tight text-white sm:text-2xl"
                            >
                                Committee Management
                            </h1>

                            <span
                                class="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-400 ring-1 ring-cyan-500/20"
                            >
                                Administration
                            </span>
                        </div>

                        <p
                            class="mt-1.5 max-w-2xl text-sm leading-6 text-slate-400"
                        >
                            Manage yearly committees, view committee members,
                            and preserve previous committees as archive.
                        </p>
                    </div>
                </div>

                <RouterLink
                    :to="{ name: 'CommitteeCreate' }"
                    class="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400"
                >
                    <Plus :size="18" />
                    Add New Committee
                </RouterLink>
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Policy -->
        <!-- ================================================= -->

        <section
            class="flex items-start gap-3 rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-4"
        >
            <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
            >
                <CheckCircle2 :size="18" />
            </div>

            <div>
                <p class="text-sm font-semibold text-white">
                    Committee Policy
                </p>

                <p class="mt-1 text-xs leading-5 text-slate-400">
                    নতুন মেয়াদ শুরু হলে নতুন Committee তৈরি হবে।
                    বর্তমান Committee-এর সদস্যদের update করা যাবে।
                    মেয়াদ শেষ হলে Committee archive হিসেবে সংরক্ষিত থাকবে।
                </p>
            </div>
        </section>

        <!-- ================================================= -->
        <!-- Stats -->
        <!-- ================================================= -->

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <!-- Total -->
            <div
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <p
                            class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Total Committees
                        </p>

                        <p class="mt-2 text-2xl font-bold text-white">
                            {{ committees.length }}
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-400"
                    >
                        <Archive :size="20" />
                    </div>
                </div>
            </div>

            <!-- Active -->
            <div
                class="rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <p
                            class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Active Committee
                        </p>

                        <p
                            class="mt-2 text-2xl font-bold text-emerald-400"
                        >
                            {{ activeCommittee ? 1 : 0 }}
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
                    >
                        <CheckCircle2 :size="20" />
                    </div>
                </div>
            </div>

            <!-- Archived -->
            <div
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <p
                            class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Archived
                        </p>

                        <p
                            class="mt-2 text-2xl font-bold text-slate-300"
                        >
                            {{ archivedCount }}
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400"
                    >
                        <Archive :size="20" />
                    </div>
                </div>
            </div>

            <!-- Members -->
            <div
                class="rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-5"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <p
                            class="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Active Members
                        </p>

                        <p class="mt-2 text-2xl font-bold text-cyan-400">
                            {{ activeMembersCount }}
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                    >
                        <Users :size="20" />
                    </div>
                </div>
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
                    Search & Filter
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
                        placeholder="Search committee year or member name..."
                        class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                    />
                </div>

                <select
                    v-model="selectedStatus"
                    @change="resetPage"
                    class="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none focus:border-cyan-500/50"
                >
                    <option value="all">
                        All Status
                    </option>

                    <option value="active">
                        Active Committee
                    </option>

                    <option value="archived">
                        Archived Committee
                    </option>
                </select>
            </div>

            <button
                v-if="search || selectedStatus !== 'all'"
                type="button"
                @click="clearFilters"
                class="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <X :size="14" />
                Clear filters
            </button>
        </section>

        <!-- ================================================= -->
        <!-- Loading -->
        <!-- ================================================= -->

        <div
            v-if="loading"
            class="space-y-4"
        >
            <div
                v-for="i in 4"
                :key="i"
                class="h-32 animate-pulse rounded-2xl border border-white/10 bg-slate-900/60"
            ></div>
        </div>

        <!-- ================================================= -->
        <!-- Committee Cards -->
        <!-- ================================================= -->

        <div
            v-else
            class="space-y-4"
        >
            <article
                v-for="committee in paginatedCommittees"
                :key="committee.id"
                class="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:border-cyan-500/20"
            >
                <div class="p-5 sm:p-6">

                    <div
                        class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
                    >

                        <!-- Committee -->
                        <div class="flex min-w-0 items-center gap-4">
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10"
                            >
                                <Users :size="22" />
                            </div>

                            <div class="min-w-0">
                                <div
                                    class="flex flex-wrap items-center gap-2"
                                >
                                    <h2
                                        class="text-lg font-bold text-white"
                                    >
                                        {{ committee.year }}
                                    </h2>

                                    <span
                                        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                                        :class="
                                            isActiveCommittee(committee)
                                                ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                                                : 'bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20'
                                        "
                                    >
                                        <span
                                            class="h-1.5 w-1.5 rounded-full"
                                            :class="
                                                isActiveCommittee(committee)
                                                    ? 'bg-emerald-400'
                                                    : 'bg-slate-500'
                                            "
                                        ></span>

                                        {{ statusLabel(committee) }}
                                    </span>
                                </div>

                                <p class="mt-1 text-xs text-slate-500">
                                    Committee ID #{{ committee.id }}
                                </p>
                            </div>
                        </div>

                        <!-- Counts -->
                        <div
                            class="grid grid-cols-3 gap-2 sm:flex sm:items-center"
                        >
                            <div
                                v-for="type in committeeTypes"
                                :key="type.value"
                                class="min-w-[105px] rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5"
                            >
                                <p class="text-[10px] text-slate-500">
                                    {{ type.shortLabel }}
                                </p>

                                <p
                                    class="mt-1 text-sm font-bold text-white"
                                >
                                    {{ getMemberCount(committee, type.value) }}
                                    <span
                                        class="font-normal text-slate-500"
                                    >
                                        জন
                                    </span>
                                </p>
                            </div>

                            <div
                                class="hidden min-w-[100px] rounded-xl border border-cyan-500/10 bg-cyan-500/5 px-3 py-2.5 sm:block"
                            >
                                <p class="text-[10px] text-slate-500">
                                    মোট
                                </p>

                                <p
                                    class="mt-1 text-sm font-bold text-cyan-400"
                                >
                                    {{ getTotalMembers(committee) }}
                                    <span
                                        class="font-normal text-slate-500"
                                    >
                                        জন
                                    </span>
                                </p>
                            </div>
                        </div>

                        <!-- View -->
                        <div class="flex justify-end">
                            <button
                                type="button"
                                @click="viewCommitteeMembers(committee)"
                                class="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                            >
                                <Users :size="16" />
                                View Members
                                <ChevronRight :size="15" />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Empty -->
            <div
                v-if="!paginatedCommittees.length"
                class="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-16 text-center"
            >
                <Users
                    :size="34"
                    class="mx-auto text-slate-600"
                />

                <p
                    class="mt-4 text-sm font-semibold text-slate-400"
                >
                    No committee found.
                </p>

                <p class="mt-1 text-xs text-slate-600">
                    Try changing your search or filter.
                </p>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Pagination -->
        <!-- ================================================= -->

        <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :start-item="startItem"
            :end-item="endItem"
            :total-items="filteredCommittees.length"
            @update:current-page="currentPage = $event"
        />
    </div>
</template>