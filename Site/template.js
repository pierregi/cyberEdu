Vue.component( "documentation" ,{
    template: `<div>
            <slot></slot>
        </div>`
});
Vue.component( "exercise" ,{
    props : ['exercise'],
    template: `<div>
        <p>{{ exercise.text }}</p>
        <div v-html="exercise.zone"></div>
      </div>`
});
Vue.component( "description" ,{
    props:["description"],
    template: `<div>
        {{ description }}
        </div>`
});
Vue.component( "liste" ,{
    props: ['data'],
    template: `<ul><li
            v-for="tab in data.themes"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: data.currentTab === tab }]"
            v-on:click="data.currentTab = tab"
            >
            {{ tab }}
        </li></ul>
`
});

Vue.component( "main_page" ,{
    props: ['data','liste','currentTabComponent'],
    template: `
<div>
    <div v-if="liste">
        <ul>
            <li
                v-for="theme in data.themes"
                v-bind:key="theme"
                v-bind:class="['tab-button', { active: data.currentTab === theme }]"
                v-on:click="data.currentTab = theme"
                >
                {{ theme }}
            </li>
        </ul>
    </div>
    <div v-else id="dynamic-component-demo">
        
        <keep-alive>
            <component
              v-bind:is="currentTabComponent"
              class="tab"
            >
            </component>
        </keep-alive>
    </div>
    
</div>`
})



