@ECHO OFF
TITLE "sass - Advanced Directory Structure"

ECHO :
ECHO :--------------------------------------:
ECHO : SASS-SCSS klasor yapisi kurulsun mu? :
ECHO :--------------------------------------:
ECHO :

ECHO : [e] Evet, [h] Hayir

SET /P result=
IF "%result%" == "e" (
    
    md "sass"
        md "sass/component"
            md "sass/component/home"
                touch "sass/component/home/ornek.scss"
        md "sass/config"
            touch "sass/config/mixin.scss"
            touch "sass/config/variable.scss"
        md "sass/global"
            touch "sass/global/animation.scss"
            touch "sass/global/footer.scss"
            touch "sass/global/form.scss"
            touch "sass/global/header.scss"
            touch "sass/global/nav.scss"
        md "sass/helper"
            touch "sass/helper/formalize.scss"
            touch "sass/helper/global.scss"
            touch "sass/helper/normalize.scss"
        md "sass/plugin"
            touch "sass/plugin/bootstrap-grid.scss"
        touch "sass/home.scss"

    ECHO :-------------------------------------------------:
    ECHO : SASS-SCSS dosya ve klasorleri basariyla kuruldu :
    ECHO :-------------------------------------------------:
)
EXIT