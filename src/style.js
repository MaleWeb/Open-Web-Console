import scssToCss from "@hai2007/algorithm/scss";

export default function () {
    if (document.getElementById('open-web-console@style')) return;

    let styleElement = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];

    styleElement.setAttribute('id', 'open-web-console@style');

    styleElement.innerHTML = scssToCss(`

    [open-web-console]{
        overflow: auto;
        background-color:#f3f3f4;
        outline: 5px solid #cfcfd4;
        border-radius: 5px;
        user-select: none;
        [isopen]{
            position:relative;
            &:before{
                content: " ";
                display: inline-block;
                width: 0;
                height: 0;
                position: absolute;
                left: -15px;
                top: 4px;
            }
        }
        [isopen='no']{
            &>div{
                display:none;
            }
            &:before{
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 10px solid #9e9e9e;
            }
        }
        [isopen='yes']{
            &:before{
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 10px solid #9e9e9e;
            }
        }
        [defType='showobject']{
            span{
                display:block;
                margin-top:5px;
            }
            .item{
                margin-left:20px;
            }
            i{
                font-style: normal;
                cursor: pointer;
            }
        }

        &>.item{
            padding:10px;
            border-bottom: 1px solid #cfcfd4;
            &>span{
                display: inline-block;
                vertical-align: top;
                &.time{
                    width: 80px;
                }
                &.msg{

                }
            }
        }
        .item{
            white-space: nowrap;
        }
    }
    `);

    styleElement.setAttribute('type', 'text/css');

    head.appendChild(styleElement);
};
