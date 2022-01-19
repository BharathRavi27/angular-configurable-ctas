import {
  Directive,
  Input,
  AfterViewInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  TemplateRef,
  ComponentRef,
  Renderer2,
  ChangeDetectorRef,
  Injector,
  HostListener,
} from '@angular/core';
import { ActionConfig, IButtonAction } from './action-button';
import { CtaConfigWrapperComponent } from './cta-config-wrapper/cta-config-wrapper.component';
import { ActionButtonService } from './services/action-button.service';
import { DownloadActionService } from './services/actions/download-action.service';
import { SendActionService } from './services/actions/send-action.service';
import { BaseActionService } from './services/base-action.service';

const IButtonConfigMap = {
  [IButtonAction.SEND]: SendActionService,
  [IButtonAction.DOWNLOAD]: DownloadActionService,
};
@Directive({
  selector: '[appCtaConfig]',
})
/**
 * Structural directive that is tightly couple with thee IButtonAction configs, providing-
 * 1. Disabling functionality
 * 2. Tooltip messaging functionality
 */
export class CtaConfigDirective implements AfterViewInit {
  //   // Relevant config service.
  appCtaService: BaseActionService;
  @Input() appCtaConfig: IButtonAction;
  ctaWrapperComponentRef: ComponentRef<CtaConfigWrapperComponent>;
  templateView: EmbeddedViewRef<unknown>;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private render: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    this.appCtaService = this.injector.get(IButtonConfigMap[this.appCtaConfig]);
    debugger;
    this.appCtaService.getConfig$().subscribe((config) => {
      if (!this.templateView || !this.ctaWrapperComponentRef) {
        this.createView();
      }
      this.updateProps(config);
    });
  }

  /**
   * Creates the component view and embeds it.
   */
  createView(): void {
    this.templateView = this.templateRef.createEmbeddedView({});
    const compFactory = this.resolver.resolveComponentFactory(
      CtaConfigWrapperComponent
    );
    this.ctaWrapperComponentRef = this.viewContainer.createComponent(
      compFactory,
      undefined,
      this.viewContainer.injector,
      [this.templateView.rootNodes]
    );
    this.render.listen(
      this.templateView.rootNodes[0],
      'click',
      this.activeFunction
    );
  }

  //   /**
  //    * Updates the following props
  //    * 1. `disable` attribute to the button
  //    * 2. `tooltipText` input to the wrapper
  //    */
  updateProps(config: ActionConfig): void {
    if (config.disabled) {
      this.render.setAttribute(
        this.templateView.rootNodes[0],
        'disabled',
        `${config.disabled}`
      );
    } else {
      // rootNodes[0] grabs the `button` element
      this.render.removeAttribute(this.templateView.rootNodes[0], 'disabled');
    }
    this.ctaWrapperComponentRef.instance.hintText = config.hintText;
    this.changeDetector.detectChanges();
  }

  activeFunction = () => {
    this.appCtaService.fireAction().subscribe((data) => {
      console.log('FIRED');
    });
  };
}
