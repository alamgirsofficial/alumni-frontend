<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import {
    ArrowLeft,
    Users,
    UserRound,
    UserCog,
    Plus,
    Save,
    AlertCircle,
    BriefcaseBusiness,
    Phone,
    MapPin,
    CheckCircle2,
} from "@lucide/vue";

import { committeePositions } from "@/constants/committeePositions.js";
import { committees as committeeData } from "@/constants/committeeData.js";

import {
    getCommittees,
    createCommitteeMember,
} from "@/composables/committeeService";

import { useToast } from "@/composables/useToast";

const router = useRouter();

const { success, warning, error } = useToast();

// =====================================================
// Committee Types
// =====================================================

const committeeTypes = [
    {
        value: "advisors",
        label: "উপদেষ্টা মণ্ডলী",
        icon: UserRound,
    },
    {
        value: "executiveCommittee",
        label: "কার্যনির্বাহী কমিটি",
        icon: UserCog,
    },
    {
        value: "members",
        label: "সদস্যবৃন্দ",
        icon: Users,
    },
];

// =====================================================
// State
// =====================================================

const committees = ref([]);

const loading = ref(false);
const saving = ref(false);

const selectedCommitteeId = ref("");
const selectedType = ref("advisors");

const memberForm = ref({
    name: "",
    designation: "",
    mobile: "",
    address: "",
});

// =====================================================
// Load Committees
// =====================================================

const loadCommittees = async () => {
    loading.value = true;

    try {
        const serviceData = await getCommittees();

        committees.value =
            Array.isArray(serviceData) && serviceData.length
                ? serviceData
                : committeeData;
    } catch (err) {
        console.error(err);

        committees.value = committeeData;

        if (!committees.value.length) {
            error("Failed to load committee data.");
        }
    } finally {
        loading.value = false;
    }
};

onMounted(loadCommittees);

// =====================================================
// Active Committee
// =====================================================

const activeCommittee = computed(() => {
    return committees.value.find((committee) => {
        if (committee.status) {
            return committee.status === "active";
        }

        return false;
    });
});

// =====================================================
// Available Committees
// =====================================================

const availableCommittees = computed(() => {
    return committees.value.filter((committee) => {
        if (committee.status) {
            return committee.status === "active";
        }

        return false;
    });
});

// =====================================================
// Selected Committee
// =====================================================

const selectedCommittee = computed(() => {
    if (!selectedCommitteeId.value) {
        return null;
    }

    return committees.value.find(
        (committee) =>
            String(committee.id) ===
            String(selectedCommitteeId.value)
    );
});

// =====================================================
// Selected Type
// =====================================================

const selectedTypeInfo = computed(() => {
    return (
        committeeTypes.find(
            (type) => type.value === selectedType.value
        ) || null
    );
});

// =====================================================
// Designation Options
// =====================================================

const designationOptions = computed(() => {
    return committeePositions[selectedType.value] || [];
});

const hasDesignationOptions = computed(() => {
    return designationOptions.value.length > 0;
});

// =====================================================
// Permissions
// =====================================================

const canAddMember = computed(() => {
    return (
        selectedCommittee.value &&
        selectedCommittee.value.status === "active"
    );
});

// =====================================================
// Reset Form
// =====================================================

const resetMemberForm = () => {
    memberForm.value = {
        name: "",
        designation: "",
        mobile: "",
        address: "",
    };
};

// =====================================================
// Committee Change
// =====================================================

const handleCommitteeChange = () => {
    const committee = selectedCommittee.value;

    if (!committee) {
        return;
    }

    if (committee.status !== "active") {
        warning(
            "Archived Committee-তে নতুন member যোগ করা যাবে না।"
        );

        selectedCommitteeId.value = "";
        resetMemberForm();

        return;
    }

    resetMemberForm();
};

// =====================================================
// Type Change
// =====================================================

const handleTypeChange = () => {
    resetMemberForm();
};

// =====================================================
// Submit
// =====================================================

const handleSubmit = async () => {
    if (!selectedCommittee.value) {
        warning(
            "অনুগ্রহ করে একটি Active Committee নির্বাচন করুন।"
        );
        return;
    }

    if (selectedCommittee.value.status !== "active") {
        warning(
            "Archived Committee-তে নতুন member যোগ করা যাবে না।"
        );
        return;
    }

    if (!memberForm.value.name.trim()) {
        warning("Member name দিন।");
        return;
    }

    if (!memberForm.value.designation.trim()) {
        warning("Designation নির্বাচন করুন।");
        return;
    }

    saving.value = true;

    try {
        await createCommitteeMember({
            committeeId: selectedCommittee.value.id,
            type: selectedType.value,
            name: memberForm.value.name.trim(),
            designation: memberForm.value.designation,
            mobile: memberForm.value.mobile.trim(),
            address: memberForm.value.address.trim(),
        });

        success(
            "Committee member successfully added."
        );

        resetMemberForm();

        router.push({
            name: "CommitteeList",
        });
    } catch (err) {
        console.error(err);

        error(
            err.message ||
                "Failed to add committee member."
        );
    } finally {
        saving.value = false;
    }
};

// =====================================================
// Back
// =====================================================

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">

        <!-- ================================================= -->
        <!-- Header -->
        <!-- ================================================= -->

        <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
            <div class="flex items-center gap-3">

                <button
                    type="button"
                    @click="goBack"
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                    <ArrowLeft :size="18" />
                </button>

                <div>
                    <div class="flex items-center gap-2">
                        <div
                            class="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400"
                        >
                            <Plus :size="15" />
                        </div>

                        <h1
                            class="text-xl font-bold tracking-tight text-white sm:text-2xl"
                        >
                            Add Committee Member
                        </h1>
                    </div>

                    <p class="mt-1 text-sm text-slate-400">
                        Add a new member to the active committee.
                    </p>
                </div>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Policy Notice -->
        <!-- ================================================= -->

        <div
            class="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4"
        >
            <div class="flex items-start gap-3">

                <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                >
                    <AlertCircle :size="18" />
                </div>

                <div class="min-w-0">
                    <p class="text-sm font-semibold text-white">
                        Committee Member Policy
                    </p>

                    <p
                        class="mt-1 max-w-3xl text-xs leading-5 text-slate-400"
                    >
                        শুধুমাত্র চলমান Active Committee-তে নতুন member
                        যোগ করা যাবে। পূর্ববর্তী Committee গুলো archive
                        হিসেবে সংরক্ষিত থাকবে।
                    </p>
                </div>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Loading -->
        <!-- ================================================= -->

        <div
            v-if="loading"
            class="rounded-2xl border border-white/10 bg-slate-900/60 p-12 text-center"
        >
            <div
                class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"
            ></div>

            <p class="mt-4 text-sm text-slate-500">
                Loading committee data...
            </p>
        </div>

        <!-- ================================================= -->
        <!-- No Active Committee -->
        <!-- ================================================= -->

        <div
            v-else-if="!activeCommittee"
            class="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
        >
            <div class="flex items-start gap-4">

                <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400"
                >
                    <AlertCircle :size="20" />
                </div>

                <div>
                    <h2 class="text-sm font-semibold text-white">
                        No Active Committee Found
                    </h2>

                    <p
                        class="mt-1 max-w-2xl text-xs leading-5 text-slate-400"
                    >
                        বর্তমানে কোনো Active Committee নেই।
                        নতুন মেয়াদের Committee তৈরি করার পর
                        member যোগ করতে পারবেন।
                    </p>

                    <button
                        type="button"
                        @click="
                            router.push({
                                name: 'CommitteeCreate',
                            })
                        "
                        class="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        <Plus :size="15" />
                        Create New Committee
                    </button>
                </div>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Main Form -->
        <!-- ================================================= -->

        <form
            v-else
            @submit.prevent="handleSubmit"
            class="mx-auto max-w-5xl space-y-6"
        >

            <!-- ================================================= -->
            <!-- Committee Selection -->
            <!-- ================================================= -->

            <section
                class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
            >
                <div
                    class="border-b border-white/10 px-5 py-4 sm:px-6"
                >
                    <div class="flex items-center gap-3">

                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                        >
                            <Users :size="19" />
                        </div>

                        <div>
                            <h2 class="text-sm font-semibold text-white">
                                Committee Information
                            </h2>

                            <p class="mt-1 text-xs text-slate-500">
                                Select the committee and committee category.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-5 sm:p-6">

                    <div class="grid gap-5 md:grid-cols-2">

                        <!-- Committee -->

                        <div>
                            <label
                                class="mb-2 block text-xs font-medium text-slate-300"
                            >
                                Committee Year
                                <span class="text-red-400">*</span>
                            </label>

                            <select
                                v-model="selectedCommitteeId"
                                @change="handleCommitteeChange"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Select active committee
                                </option>

                                <option
                                    v-for="committee in availableCommittees"
                                    :key="committee.id"
                                    :value="committee.id"
                                >
                                    {{ committee.year }} — চলমান
                                </option>
                            </select>

                            <p class="mt-2 text-[11px] text-slate-500">
                                শুধুমাত্র Active Committee নির্বাচন করা যাবে।
                            </p>
                        </div>

                        <!-- Type -->

                        <div>
                            <label
                                class="mb-2 block text-xs font-medium text-slate-300"
                            >
                                Committee Type
                                <span class="text-red-400">*</span>
                            </label>

                            <div class="relative">
                                <select
                                    v-model="selectedType"
                                    @change="handleTypeChange"
                                    class="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-10 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                                >
                                    <option
                                        v-for="type in committeeTypes"
                                        :key="type.value"
                                        :value="type.value"
                                    >
                                        {{ type.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Selected Committee -->

                    <div
                        v-if="selectedCommittee"
                        class="mt-5 flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div class="flex items-center gap-3">

                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400"
                            >
                                <CheckCircle2 :size="17" />
                            </div>

                            <div>
                                <p class="text-[10px] uppercase tracking-wider text-slate-500">
                                    Selected Committee
                                </p>

                                <p class="mt-1 text-sm font-bold text-white">
                                    {{ selectedCommittee.year }}
                                </p>
                            </div>
                        </div>

                        <span
                            class="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/20"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            ></span>

                            Active
                        </span>
                    </div>
                </div>
            </section>

            <!-- ================================================= -->
            <!-- Member Information -->
            <!-- ================================================= -->

            <section
                class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
            >
                <div
                    class="border-b border-white/10 px-5 py-4 sm:px-6"
                >
                    <div class="flex items-center gap-3">

                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                        >
                            <UserRound :size="19" />
                        </div>

                        <div>
                            <h2 class="text-sm font-semibold text-white">
                                Member Information
                            </h2>

                            <p class="mt-1 text-xs text-slate-500">
                                Enter the member's personal and committee information.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-5 sm:p-6">

                    <div class="grid gap-5 md:grid-cols-2">

                        <!-- Name -->

                        <div>
                            <label
                                class="mb-2 block text-xs font-medium text-slate-300"
                            >
                                Member Name
                                <span class="text-red-400">*</span>
                            </label>

                            <input
                                v-model="memberForm.name"
                                type="text"
                                placeholder="Enter member name"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            />
                        </div>

                        <!-- Designation -->

                        <div>
                            <label
                                class="mb-2 block text-xs font-medium text-slate-300"
                            >
                                Designation
                                <span class="text-red-400">*</span>
                            </label>

                            <div
                                v-if="hasDesignationOptions"
                                class="relative"
                            >
                                <select
                                    v-model="memberForm.designation"
                                    class="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 pr-10 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Select designation
                                    </option>

                                    <option
                                        v-for="designation in designationOptions"
                                        :key="designation"
                                        :value="designation"
                                    >
                                        {{ designation }}
                                    </option>
                                </select>
                            </div>

                            <input
                                v-else
                                v-model="memberForm.designation"
                                type="text"
                                placeholder="Enter designation"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            />

                            <p
                                v-if="hasDesignationOptions"
                                class="mt-2 text-[11px] text-slate-500"
                            >
                                {{ selectedTypeInfo?.label }}-এর জন্য নির্ধারিত
                                position থেকে নির্বাচন করুন।
                            </p>
                        </div>

                        <!-- Mobile -->

                        <div>
                            <label
                                class="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300"
                            >
                                <Phone :size="13" />
                                Mobile Number
                            </label>

                            <input
                                v-model="memberForm.mobile"
                                type="text"
                                placeholder="Enter mobile number"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            />
                        </div>

                        <!-- Address -->

                        <div>
                            <label
                                class="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300"
                            >
                                <MapPin :size="13" />
                                Address
                            </label>

                            <input
                                v-model="memberForm.address"
                                type="text"
                                placeholder="Enter address"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================================================= -->
            <!-- Preview -->
            <!-- ================================================= -->

            <section
                v-if="
                    memberForm.name ||
                    memberForm.designation
                "
                class="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
            >
                <div class="mb-4">
                    <h2 class="text-sm font-semibold text-white">
                        Member Preview
                    </h2>

                    <p class="mt-1 text-xs text-slate-500">
                        Preview how the member information will appear.
                    </p>
                </div>

                <div
                    class="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                >
                    <div
                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-sm font-bold uppercase text-cyan-400"
                    >
                        {{
                            memberForm.name
                                ? memberForm.name
                                      .split(" ")
                                      .slice(0, 2)
                                      .map(
                                          (word) =>
                                              word.charAt(0)
                                      )
                                      .join("")
                                : "?"
                        }}
                    </div>

                    <div class="min-w-0">
                        <p class="text-sm font-bold text-white">
                            {{
                                memberForm.name ||
                                "Member Name"
                            }}
                        </p>

                        <p class="mt-1 text-xs text-cyan-400">
                            {{
                                memberForm.designation ||
                                "Designation"
                            }}
                        </p>

                        <div
                            class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500"
                        >
                            <span v-if="memberForm.mobile">
                                {{ memberForm.mobile }}
                            </span>

                            <span v-if="memberForm.address">
                                {{ memberForm.address }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================================================= -->
            <!-- Actions -->
            <!-- ================================================= -->

            <div
                class="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end"
            >
                <button
                    type="button"
                    @click="goBack"
                    class="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    :disabled="saving || !canAddMember"
                    class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save
                        v-if="!saving"
                        :size="17"
                    />

                    <span
                        v-else
                        class="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                    ></span>

                    {{
                        saving
                            ? "Saving..."
                            : "Add Member"
                    }}
                </button>
            </div>
        </form>
    </div>
</template>