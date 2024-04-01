<!-- RiskProgressBar.vue -->

<template>
    <div class="risk-progress-container">
        <div class="progress-bar-ctn">
            <span>{{ label }}</span>
            <div class="risk-progress-bar">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"
                    :class="{ 'below-average': isBelowAverage }">

                </div>
                <div class="risk-limit-line" :style="{ left: riskLimitPercentage + '%' }"></div>
            </div>
            <span class="risk-percentage">{{ progressPercentage }}%</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    label: String,
    progressPercentage: Number,
    riskLimitPercentage: String
});

const isBelowAverage = computed(() => props.progressPercentage < props.riskLimitPercentage);
</script>

<style scoped>
.progress-bar-ctn{
    width: 100%;
}

.risk-progress-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.risk-progress-bar {
    background-color: #eee;
    border-radius: 0.25rem;
    overflow: hidden;
    flex-grow: 1;
    position: relative;
}

.progress-bar {
    height: 1.5rem;
    background-color: #4caf50;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    color: white;
    transition: width 0.5s ease;
}

.progress-bar.below-average {
    background-color: #f44336;
}

.risk-percentage {
    margin-left: 10px;
}

.risk-limit-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: black;
    transition: left 0.
}
</style>