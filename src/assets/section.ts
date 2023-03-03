import { Directive, HostListener, OnInit } from "@angular/core";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { AddItemComponent } from "src/app/components/add-item/add-item.component";
import { PersonalInfoService } from "src/app/services/personal-info.service";

@Directive()
export abstract class Section implements OnInit {
    // Esto cambia cuando pase la app a inglés, ahí uso lo mismo que para hacer los http request
    campo: string = '';
    windowWidth: number = window.innerWidth;
    abstract editModal: AddItemComponent;
    field: string = '';
    editMode: boolean = false;
    visible: boolean = false;
    itemDelIcon = faTrashCanArrowUp;

    @HostListener('window:resize')
    onResize(): void {
        this.windowWidth = window.innerWidth;
    }

    constructor(protected personalData: PersonalInfoService, protected toastService: ToastrService) { }

    abstract getData(): void;

    toggleModal() {
        this.editModal.reset();
        this.editModal.open(this.editModal.myModal);
    }
    passData(item: any) {
        this.toggleModal();
        this.editModal.loadEditData!(item);
    }

    showSuccess(type: 'add' | 'edit', title?: string) {
        if (title) {
            this.campo = title;
        }

        if (type === 'add') {
            this.toastService.success('Ítem añadido correctamente', this.campo);
        } else {
            this.toastService.success('Cambios guardados', this.campo);
        }
    }

    showDelete(title?: string) {
        if (title) {
            this.campo = title;
        }

        this.toastService.error('Ítem eliminado', this.campo, {toastClass:'toast-delete ngx-toastr'});
    }

    ngOnInit(): void {
        this.getData();
    }
}