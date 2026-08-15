<script setup>
import { ref, computed, watch } from "vue";
import { Eye, ChevronLeft, ChevronRight } from "@lucide/vue";
import MemberDetailsModal from "./MemberDetailsModal.vue";


// -------------------------------------
// Props
// -------------------------------------

const props = defineProps({
    members: {
        type: Array,
        required: true,
    },

    pagination: {
        type: Boolean,
        default: false,
    },

    perPage: {
        type: Number,
        default: 10,
    },
});


// -------------------------------------
// Modal
// -------------------------------------

const selectedMember = ref(null);

const openModal = (member) => {
    selectedMember.value = member;
};

const closeModal = () => {
    selectedMember.value = null;
};


// -------------------------------------
// Pagination
// -------------------------------------

const currentPage = ref(1);


// Total pages
const totalPages = computed(() => {
    if (!props.pagination) {
        return 1;
    }

    return Math.ceil(props.members.length / props.perPage);
});


// Paginated members
const paginatedMembers = computed(() => {
    if (!props.pagination) {
        return props.members;
    }

    const start =
        (currentPage.value - 1) * props.perPage;

    const end =
        start + props.perPage;

    return props.members.slice(start, end);
});


// -------------------------------------
// Page Numbers
// -------------------------------------

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;

    if (total <= 5) {
        return Array.from(
            { length: total },
            (_, index) => index + 1
        );
    }

    if (current <= 3) {
        return [1, 2, 3, 4, 5];
    }

    if (current >= total - 2) {
        return [
            total - 4,
            total - 3,
            total - 2,
            total - 1,
            total,
        ];
    }

    return [
        current - 2,
        current - 1,
        current,
        current + 1,
        current + 2,
    ];
});


// -------------------------------------
// Change Page
// -------------------------------------

const goToPage = (page) => {
    if (
        page < 1 ||
        page > totalPages.value
    ) {
        return;
    }

    currentPage.value = page;
};


// -------------------------------------
// Reset Page
// -------------------------------------
// Year অথবা tab change হলে নতুন data আসলে
// pagination আবার প্রথম page থেকে শুরু হবে.

watch(
    () => props.members,
    () => {
        currentPage.value = 1;
    }
);

</script>


<template>

    <section>


        <!-- ================================= -->
        <!-- Desktop Table -->
        <!-- ================================= -->

        <div
            class="
                hidden
                sm:block

                relative
                overflow-hidden

                rounded-2xl

                border border-white/10

                bg-white/5
                backdrop-blur-xl

                shadow-xl
                shadow-black/10
            "
        >

            <table
                class="
                    w-full
                    text-left
                "
            >

                <!-- ========================= -->
                <!-- Table Header -->
                <!-- ========================= -->

                <thead
                    class="
                        bg-blue-500/10
                    "
                >

                    <tr>

                        <!-- Number -->

                        <th
                            class="
                                w-16
                                px-5 py-4

                                text-left

                                text-xs
                                font-semibold

                                text-cyan-300

                                uppercase
                                tracking-wide
                            "
                        >
                            #
                        </th>


                        <!-- Name -->

                        <th
                            class="
                                px-5 py-4

                                text-left

                                text-xs
                                font-semibold

                                text-cyan-300

                                uppercase
                                tracking-wide
                            "
                        >
                            Name
                        </th>


                        <!-- Designation -->

                        <th
                            class="
                                px-5 py-4

                                text-left

                                text-xs
                                font-semibold

                                text-cyan-300

                                uppercase
                                tracking-wide
                            "
                        >
                            Designation
                        </th>


                        <!-- Action -->

                        <th
                            class="
                                w-24
                                px-5 py-4

                                text-center

                                text-xs
                                font-semibold

                                text-cyan-300

                                uppercase
                                tracking-wide
                            "
                        >
                            Action
                        </th>

                    </tr>

                </thead>


                <!-- ========================= -->
                <!-- Table Body -->
                <!-- ========================= -->

                <tbody>

                    <tr
                        v-for="(member, index) in paginatedMembers"
                        :key="member.id"

                        class="
                            group

                            border-t
                            border-white/5

                            hover:bg-white/5

                            transition-all
                            duration-300
                        "
                    >

                        <!-- Number -->

                        <td
                            class="
                                px-5 py-4

                                text-sm
                                text-gray-500
                            "
                        >
                            {{
                                props.pagination
                                    ? String(
                                        (currentPage - 1) *
                                        props.perPage +
                                        index +
                                        1
                                    ).padStart(2, "0")
                                    : String(index + 1).padStart(2, "0")
                            }}
                        </td>


                        <!-- Name -->

                        <td
                            class="
                                px-5 py-4
                            "
                        >

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


                        <!-- Designation -->

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


                        <!-- Action -->

                        <td
                            class="
                                px-5 py-4
                            "
                        >

                            <div
                                class="
                                    flex
                                    justify-center
                                "
                            >

                                <button
                                    @click="openModal(member)"
                                    type="button"
                                    title="View Details"

                                    class="
                                        w-9 h-9

                                        flex
                                        items-center
                                        justify-center

                                        rounded-xl

                                        bg-cyan-400/10

                                        border
                                        border-cyan-400/20

                                        text-cyan-400

                                        hover:bg-cyan-400
                                        hover:text-slate-950
                                        hover:border-cyan-400

                                        hover:shadow-lg
                                        hover:shadow-cyan-500/20

                                        transition-all
                                        duration-300
                                    "
                                >
                                    <Eye :size="17" />
                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- ========================= -->
                    <!-- Empty State -->
                    <!-- ========================= -->

                    <tr
                        v-if="!paginatedMembers.length"
                    >

                        <td
                            colspan="4"

                            class="
                                px-5 py-12

                                text-center

                                text-sm
                                text-gray-500
                            "
                        >
                            No data available
                        </td>

                    </tr>

                </tbody>

            </table>


            <!-- ================================= -->
            <!-- Desktop Pagination -->
            <!-- ================================= -->

            <div
                v-if="
                    props.pagination &&
                    totalPages > 1
                "

                class="
                    flex
                    items-center
                    justify-between

                    gap-4

                    px-5
                    py-4

                    border-t
                    border-white/10
                "
            >

                <!-- Showing -->

                <p
                    class="
                        hidden
                        sm:block

                        text-xs
                        text-gray-500
                    "
                >
                    Showing

                    <span class="text-gray-300">
                        {{
                            (currentPage - 1) *
                            props.perPage + 1
                        }}
                    </span>

                    -

                    <span class="text-gray-300">
                        {{
                            Math.min(
                                currentPage *
                                props.perPage,
                                props.members.length
                            )
                        }}
                    </span>

                    of

                    <span class="text-gray-300">
                        {{ props.members.length }}
                    </span>
                </p>


                <!-- Pagination -->

                <div
                    class="
                        flex
                        items-center
                        gap-1
                        mx-auto
                        sm:mx-0
                    "
                >

                    <!-- Previous -->

                    <button
                        @click="goToPage(currentPage - 1)"
                        :disabled="currentPage === 1"

                        type="button"

                        class="
                            w-9 h-9

                            flex
                            items-center
                            justify-center

                            rounded-lg

                            border
                            border-white/10

                            text-gray-400

                            hover:bg-white/10
                            hover:text-white

                            disabled:opacity-30
                            disabled:cursor-not-allowed

                            transition
                        "
                    >
                        <ChevronLeft :size="17" />
                    </button>


                    <!-- Page Numbers -->

                    <button
                        v-for="page in visiblePages"
                        :key="page"

                        @click="goToPage(page)"

                        type="button"

                        class="
                            w-9 h-9

                            flex
                            items-center
                            justify-center

                            rounded-lg

                            text-sm

                            transition-all
                            duration-300
                        "

                        :class="
                            currentPage === page
                                ? `
                                    bg-cyan-400
                                    text-slate-950
                                    shadow-lg
                                    shadow-cyan-500/20
                                `
                                : `
                                    text-gray-400
                                    hover:bg-white/10
                                    hover:text-white
                                `
                        "
                    >
                        {{ page }}
                    </button>


                    <!-- Next -->

                    <button
                        @click="goToPage(currentPage + 1)"
                        :disabled="currentPage === totalPages"

                        type="button"

                        class="
                            w-9 h-9

                            flex
                            items-center
                            justify-center

                            rounded-lg

                            border
                            border-white/10

                            text-gray-400

                            hover:bg-white/10
                            hover:text-white

                            disabled:opacity-30
                            disabled:cursor-not-allowed

                            transition
                        "
                    >
                        <ChevronRight :size="17" />
                    </button>

                </div>

            </div>

        </div>


        <!-- ================================= -->
        <!-- Mobile Cards -->
        <!-- ================================= -->

        <div
            class="
                sm:hidden
                space-y-3
            "
        >

            <div
                v-for="(member, index) in paginatedMembers"
                :key="member.id"

                class="
                    relative

                    p-4

                    rounded-2xl

                    bg-white/5
                    backdrop-blur-xl

                    border border-white/10

                    hover:bg-white/10
                    hover:border-cyan-400/20

                    transition-all
                    duration-300
                "
            >

                <!-- Top -->

                <div
                    class="
                        flex
                        items-center
                        justify-between
                    "
                >

                    <!-- Number -->

                    <span
                        class="
                            text-xs
                            font-semibold

                            text-cyan-400

                            tracking-wider
                        "
                    >
                        {{
                            props.pagination
                                ? String(
                                    (currentPage - 1) *
                                    props.perPage +
                                    index +
                                    1
                                ).padStart(2, "0")
                                : String(index + 1).padStart(2, "0")
                        }}
                    </span>


                    <!-- Action -->

                    <button
                        @click="openModal(member)"
                        type="button"
                        title="View Details"

                        class="
                            w-9 h-9

                            flex
                            items-center
                            justify-center

                            rounded-xl

                            bg-cyan-400/10

                            border
                            border-cyan-400/20

                            text-cyan-400

                            hover:bg-cyan-400
                            hover:text-slate-950

                            transition-all
                            duration-300
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


            <!-- Mobile Empty -->

            <div
                v-if="!paginatedMembers.length"

                class="
                    py-10

                    text-center

                    text-sm
                    text-gray-500
                "
            >
                No data available
            </div>


            <!-- ================================= -->
            <!-- Mobile Pagination -->
            <!-- ================================= -->

            <div
                v-if="
                    props.pagination &&
                    totalPages > 1
                "

                class="
                    flex
                    items-center
                    justify-center

                    gap-1

                    pt-3
                "
            >

                <!-- Previous -->

                <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"

                    type="button"

                    class="
                        w-9 h-9

                        flex
                        items-center
                        justify-center

                        rounded-lg

                        border
                        border-white/10

                        text-gray-400

                        hover:bg-white/10
                        hover:text-white

                        disabled:opacity-30
                        disabled:cursor-not-allowed

                        transition
                    "
                >
                    <ChevronLeft :size="17" />
                </button>


                <!-- Pages -->

                <button
                    v-for="page in visiblePages"
                    :key="page"

                    @click="goToPage(page)"

                    type="button"

                    class="
                        w-9 h-9

                        flex
                        items-center
                        justify-center

                        rounded-lg

                        text-sm

                        transition-all
                        duration-300
                    "

                    :class="
                        currentPage === page
                            ? `
                                bg-cyan-400
                                text-slate-950
                            `
                            : `
                                text-gray-400
                                hover:bg-white/10
                                hover:text-white
                            `
                    "
                >
                    {{ page }}
                </button>


                <!-- Next -->

                <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"

                    type="button"

                    class="
                        w-9 h-9

                        flex
                        items-center
                        justify-center

                        rounded-lg

                        border
                        border-white/10

                        text-gray-400

                        hover:bg-white/10
                        hover:text-white

                        disabled:opacity-30
                        disabled:cursor-not-allowed

                        transition
                    "
                >
                    <ChevronRight :size="17" />
                </button>

            </div>

        </div>


        <!-- ================================= -->
        <!-- Modal -->
        <!-- ================================= -->

        <MemberDetailsModal
            v-if="selectedMember"
            :member="selectedMember"
            @close="closeModal"
        />

    </section>

</template>