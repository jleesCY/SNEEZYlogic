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
                <a class="navbar-brand" href="#" style='font-family:monospace'><strong style="font-size:20pt">SNEEZY</strong><span style="color:rgb(255,100,100);font-size:17pt">logic</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-danger" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>

        <div id="body" style="height:100%;display:grid;grid-template-columns:auto 5px 340px;flex:1 1 auto;overflow:hidden">
            <div id='dropwindow' style="overflow:hidden">
                <div id="simulation-window" style="background-color:none;z-index:-2;position:relative">
                    <div class="gate" style="top:0px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="and"><img src="images/gates/AND.svg"></div>
                        <div class="connector off"></div>
                    </div>

                    <div class="gate" style="top:50px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="or"><img src="images/gates/OR.svg"></div>
                        <div class="connector off"></div>
                    </div>

                    <div class="gate" style="top:100px;left:0px">
                        <div class="input-1">
                            <div class="connector off"></div>
                        </div>
                        <div class="not"><img src="images/gates/NOT.svg"></div>
                        <div class="connector on"></div>
                    </div>

                    <div class="gate" style="top:150px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="nand"><img src="images/gates/NAND.svg"></div>
                        <div class="connector on"></div>
                    </div>

                    <div class="gate" style="top:200px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="nor"><img src="images/gates/NOR.svg"></div>
                        <div class="connector on"></div>
                    </div>

                    <div class="gate" style="top:250px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="xor"><img src="images/gates/XOR.svg"></div>
                        <div class="connector off"></div>
                    </div>

                    <div class="gate" style="top:300px;left:0px">
                        <div class="input-2">
                            <div class="connector off"></div>
                            <div class="connector off"></div>
                        </div>
                        <div class="xnor"><img src="images/gates/XNOR.svg"></div>
                        <div class="connector on"></div>
                    </div>

                </div>
            </div>
            <div style="background-color:#333"></div>
            <div id="side-panel" style="background-color:#EEE;user-select:none;overflow:scroll">
                <ul class="accordion">
                    <li>
                        <button class="accordion-control">Inputs</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns:150px 150px; gap:10px">
                                <div id='button' style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">Button</div>
                                </div>
                                <div id="switch" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">Switch</div>
                                </div>
                                <div id="clock" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">Clock</div>
                                </div>
                                <div id="high" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">High</div>
                                </div>
                                <div id="low" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">Low</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Outputs</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 80px 80px 80px; gap:10px">
                                <div id='led' style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red;z-index:200" draggable='true'></div>
                                    <div style="margin:auto">LED</div>
                                </div>
                                <div id="7-seg" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">7-Seg</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Gates</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 150px 150px; gap:10px">
                                <div id='not-gate' style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">NOT</div>
                                </div>
                                <div id="and-gate" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red;" draggable='true'>
                                    </div>
                                    <div style="margin:auto">AND</div>
                                </div>
                                <div id="or-gate" style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red" draggable='true'></div>
                                    <div style="margin:auto">OR</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="accordion-control">Other</button>
                        <div class="accordion-panel" style="display:block">
                            <div style="display:grid;grid-template-columns: 80px 80px 80px; gap:10px">
                                <div id='label' style="display:flex;flex-direction:column;justify-content:center">
                                    <div style="height:100px;background-color:red;z-index:200" draggable='true'></div>
                                    <div style="margin:auto">Label</div>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <script>
            $('.accordion').on('click', '.accordion-control', function(e){
                e.preventDefault(); //prevent default action of a button 
                $(this) //get the element the user clicked on
                    .next('.accordion-panel') //select the next accordion panel
                    .not(':animated') //if it is not currently animating
                    .slideToggle(); //use slideToggle to show or hide it
            })

            let zoom = 0.065
            let yoff = document.querySelector("#navbar").getBoundingClientRect().height
            elementId = 0
            let components = {}
            let dropzone = document.querySelector("#dropwindow")

            

            let sim = document.querySelector("#simulation-window")
            let instance = panzoom(sim,{
                smoothScroll: false,
                zoomSpeed: zoom
            })
            $(function(){
                window.onbeforeunload = function ()
                {
                    return "";
                };

            })

            let refresh = () => {
                sim.innerHTML = ""
                for (id of Object.keys(components)) {
                    let component = document.createElement('div')
                    component.setAttribute('style', 'background-color:red;position:absolute;width:80px;height:100px;top:' + components[id].location.y + 'px;left:' + components[id].location.x + 'px;')
                    sim.appendChild(component)
                }
            }

            document.querySelector("#side-panel").addEventListener('pointerdown', () => {
                instance.pause()
            })
            document.addEventListener('pointerup', () => {
                instance.resume()
            })

            dropzone.addEventListener('dragover', () => {
                event.preventDefault()
            })

            dropzone.addEventListener('drop', () => {
                event.preventDefault()
                instance.resume()

                w = 80
                h = 100

                

                scale = instance.getTransform().scale
                loc_x = (event.x - sim.getBoundingClientRect().x) / scale
                loc_y = ((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale

                components[elementId] = {
                    type: "and",
                    location: {
                        x: loc_x,
                        y: loc_y
                    },
                    out: [],
                    in1: [],
                    in2: []
                }
                elementId += 1
                refresh()
            })
            
            instance.on('transform', () => {
            })
        </script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        
    </body>
</html>