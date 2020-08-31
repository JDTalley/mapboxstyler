class Selectors {
    constructor() {
        // Select Input div
        this.inputdiv = document.querySelector('.input');

        // Select Geometry Type
        this.geoTypebtn = document.querySelector('.geometry-type');

        // Select Feat divs
        //this.featDivs = document.querySelectorAll('.input-feat');

        // Select Prop divs
        this.pointdiv = document.querySelector('.input-feat-point');
        this.linediv = document.querySelector('.input-feat-line');
        this.polygondiv = document.querySelector('.input-feat-polygon');

        // Select Point Properties
        this.pointRadius = document.querySelector('.point-radius');
        this.pointColor = document.querySelector('.point-color');
        this.pointBlur = document.querySelector('.point-blur');
        this.pointOpacity = document.querySelector('.point-opacity');
        this.pointSColor = document.querySelector('.point-scolor');
        this.pointSOpacity = document.querySelector('.point-sopacity');
        this.pointSWidth = document.querySelector('.point-swidth');

        // Select Line Properties
        this.lineBlur = document.querySelector('.line-blur');
        this.lineCap = document.querySelector('.line-cap');
        this.lineColor = document.querySelector('.line-color');
        this.lineOpacity = document.querySelector('.line-opacity');
        this.lineWidth = document.querySelector('.line-width');

        // Select Polygon Properties
        this.polygonColor = document.querySelector('.polygon-color');
        this.polygonOpacity = document.querySelector('.polygon-opacity');
        this.polygonOColor = document.querySelector('.polygon-outline-color');

        // Select Generate Button
        this.genJSONbtn = document.querySelector('.gen-json');
        this.genJSONdiv = document.querySelector('.json');
        this.jsonArea = document.querySelector('.json-area');
    }
}