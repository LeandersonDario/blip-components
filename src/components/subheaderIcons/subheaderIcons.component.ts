import angular from 'core/angular';
import template from './SubheaderIconsView.html';
import { StateService } from '@uirouter/angularjs';

class SubheaderIcons {
    //Properties
    menuIcons: any = [];
    application: any;
    isAttendance: boolean;
    showBlipChatSidenav: () => {};
    SubheaderIcons;
    constructor(private $state: StateService) {}

    async $onChanges($changedObjects) {
        if (
            $changedObjects.menuIcons.currentValue &&
            $changedObjects.menuIcons.currentValue.length > 0
        ) {
            this.menuIcons = $changedObjects.menuIcons.currentValue;
        }
    }

    getIcons(key) {
        switch (key) {
            case 'auth.application.detail.integrations':
                return 'icon-integration';
            case 'auth.application.detail.configurations':
                return 'icon-config';
            case 'auth.application.detail.team':
                return 'icon-team-1';
            default:
                return '';
        }
    }

    isActive(state) {
        return this.$state.includes(state);
    }
}

export const SubheaderIconsComponent = angular
    .module('blipComponents.subheaderIcons', [])
    .component('subheaderIcons', {
        template,
        controllerAs: '$ctrl',
        controller: SubheaderIcons,
        bindings: {
            menuIcons: '<',
            isAttendance: '<?',
            showBlipChatSidenav: '<?',
        },
    })
    .name;
