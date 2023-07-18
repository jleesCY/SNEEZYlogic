<!DOCTYPE html>
<html lang="en" style="height:100%;margin:0">
    <head>
        <title>SneezyLogic</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
        <script src='https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js'></script>
        <link href="css/index.css" rel="stylesheet">
        <link href="css/shapes.css" rel="stylesheet">
        
    </head>
    <body style="height:100%;margin:0;background-color:#DDD">
        <div id="main" style="display:flex;height:100%;flex-flow:column">
        <nav id='navbar' class="navbar navbar-expand-lg navbar-dark" style="background-color:rgb(30,30,30);flex:0 1 auto">
            <div class="container-fluid">
                <a class="navbar-brand" href="../" style='font-family:monospace'><strong style="font-size:20pt">SNEEZY</strong><span style="color:rgb(255,100,100);font-size:17pt">logic</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <button title='Undo' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/undo.svg" /></button>
                        <button title='Redo' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/redo.svg" /></button>
                        <div style="width:10px"></div>
                        <button title='Pan' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/pan.svg" /></button>
                        <button title='Edit Circuit' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/cursor.svg" /></button>
                        <div style="width:10px"></div>
                        <button title='Save Circuit' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/save.svg" /></button>
                        <button title='Load Circuit' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/load.svg" /></button>
                        <button title='Delete Circuit' style='background-color:white;width:35px;height:35px;padding:0;margin:0;border-radius:5px'><img src="images/other/trash.svg" /></button>
                    </ul>
                    <div class="d-flex">
                        <input class="form-control me-3" type="search" placeholder="Search Components" aria-label="Search" style='width:300px'>
                    </div>
                </div>
            </div>
        </nav>

        <div id="body" style="height:100%;display:grid;grid-template-columns:auto 5px 340px;flex:1 1 auto;overflow:hidden">
            <div id='dropwindow' style="overflow:hidden">
                <div id="simulation-window" style="background-color:none;z-index:-2;position:relative">
                
                </div>
            </div>
            <div style="background-color:#333"></div>
            <div id="side-panel" style="background-color:#EEE;user-select:none;overflow:scroll">
                <ul class="accordion">
                    <li>
                        <button class="accordion-control">Inputs</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns:150px 150px; gap:10px">
                                <div id='button' class='INPUT' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="button" style="margin:auto" draggable="true">
                                        <div class="body button low"></div>
                                    </div>
                                    <div style="margin:auto">Button</div>
                                </div>
                                <div id="switch" class='INPUT' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="switch" style="margin:auto" draggable="true">
                                        <div class="body switch low">
                                            <div class='top'></div><div class='bottom'></div>
                                        </div>
                                    </div>
                                    <div style="margin:auto">Switch</div>
                                </div>
                                <div id="vcc" class='INPUT' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="vcc" style="margin:auto" draggable="true">
                                        <div class="body const high">1</div>
                                    </div>
                                    <div style="margin:auto">High</div>
                                </div>
                                <div id="gnd" class='INPUT' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="gnd" style="margin:auto" draggable="true">
                                        <div class="body const low">0</div>
                                    </div>
                                    <div style="margin:auto">Low</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Outputs</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 150px 150px; gap:10px">
                                <div id='led' class='OUTPUT' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="led" style="margin:auto" draggable="true">
                                        <div class="body led low"></div>
                                    </div>
                                    <div style="margin:auto">LED</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Gates</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 150px 150px; gap:10px">
                                <div id='not-gate' class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="not" style="margin:auto" draggable="true"><img src="images/gates/NOT.svg" style="height:50px"/></div>
                                    <div style="margin:auto">NOT</div>
                                </div>
                                <div id="and-gate" class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="and" style="margin:auto" draggable="true"><img src="images/gates/AND.svg" style="height:50px"/></div>
                                    <div style="margin:auto">AND</div>
                                </div>
                                <div id="or-gate" class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="or" style="margin:auto" draggable="true"><img src="images/gates/OR.svg" style="height:50px"/></div>
                                    <div style="margin:auto">OR</div>
                                </div>
                                <div id='nand-gate' class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="nand" style="margin:auto" draggable="true"><img src="images/gates/NAND.svg" style="height:50px"/></div>
                                    <div style="margin:auto">NAND</div>
                                </div>
                                <div id="nor-gate" class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="nor" style="margin:auto" draggable="true"><img src="images/gates/NOR.svg" style="height:50px"/></div>
                                    <div style="margin:auto">NOR</div>
                                </div>
                                <div id="xor-gate" class='GATE' style="display:flex;flex-direction:column;justify-content:center">
                                    <div class="draggable" id="xor" style="margin:auto" draggable="true"><img src="images/gates/XOR.svg" style="height:50px"/></div>
                                    <div style="margin:auto">XOR</div>
                                </div>
                                <div id="xnor-gate" class='GATE' style="display:flex;flex-direction:column;justify-content:center;">
                                    <div class="draggable" id="xnor" style="margin:auto" draggable="true"><img src="images/gates/XNOR.svg" style="height:50px"/></div>
                                    <div style="margin:auto">XNOR</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Other</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 150px 150px; gap:10px">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <script src="js/gate.js"></script>
        <script src="js/wire.js"></script>
        <script src="js/node.js"></script>
        <script src="js/index.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    </body>
</html>