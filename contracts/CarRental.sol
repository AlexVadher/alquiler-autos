// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract AlquilerAutos {
    address public owner;
    uint256 public precioAlquiler;
    struct Alquiler {
        address user;
        string car;
        uint256 startDate;
        uint256 endDate;
        uint256 totalPrice;
    }
    mapping(address => Alquiler) public autosAlquilados;

    event Alquilado(
        address indexed arrendatario,
        string car,
        uint256 startDate,
        uint256 endDate,
        uint256 totalPrice
    );
    event Devuelto(address indexed arrendatario, string car);

    constructor() {
        owner = msg.sender;
        precioAlquiler = 100000000000000000; // Precio de alquiler en wei
    }

    function alquilarAuto(
        string memory car,
        uint256 startDate,
        uint256 endDate,
        uint256 totalPrice
    ) public payable {
        require(
            msg.value >= totalPrice,
            "Saldo insuficiente para alquilar un auto"
        );
        require(
            autosAlquilados[msg.sender].startDate == 0,
            "Ya tienes un auto alquilado"
        );

        autosAlquilados[msg.sender] = Alquiler({
            user: msg.sender,
            car: car,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice
        });

        emit Alquilado(msg.sender, car, startDate, endDate, totalPrice);
    }

    function devolverAuto() public {
        require(
            autosAlquilados[msg.sender].startDate != 0,
            "No tienes un auto alquilado"
        );

        string memory car = autosAlquilados[msg.sender].car;
        delete autosAlquilados[msg.sender];

        emit Devuelto(msg.sender, car);
    }

    function retirarFondos() public {
        require(
            msg.sender == owner,
            "Solo el propietario puede retirar fondos"
        );
        payable(owner).transfer(address(this).balance);
    }
}
