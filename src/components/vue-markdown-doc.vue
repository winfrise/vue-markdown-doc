<template>
    <div class="vue-markdown-doc">
        <div class="slot-description">
            <slot name="description"></slot>
        </div>
        <div class="source-slot">
            <slot name="source"></slot>
        </div>
        <div class="slot-default">
            <slot></slot>
        </div>
        <div class="highlight-slot" v-if="isExpanded">
            <slot name="highlight"></slot>
        </div>
        <div class="control-bar">
            <button type="button" class="control-btn" @click="isExpanded = !isExpanded">{{isExpanded ? '隐藏' : '显示'}}源码</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueMarkdownDoc',
    data() {
        return {
            isExpanded: false
        }
    }
}
</script>

<style scoped >
    .vue-markdown-doc {
        border: 1px solid #ebebeb;
        border-radius: 4px;
        margin: 15px 0;
    }
    .source-slot {
        padding: 24px;
    }
    .highlight-slot {
        min-height: 100px;
        padding: 18px 24px;
        background: #fafafa;
        border-top: 1px solid #eaeefb;
    }
    .control-bar {
        padding: 10px 24px;
        text-align: center;
        border-top: 1px solid #eaeefb;
    }
    .control-btn {
        font-size: 14px;
        border: none;
        background: transparent;
        color: #d3dce6;
        cursor: pointer;
    }
    .control-btn:hover {
        color: #409eff
    }
</style>
