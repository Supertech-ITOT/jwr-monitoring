package com.company.jwr_monitoring.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.entity.Category;
import com.company.jwr_monitoring.entity.Parameter;
import com.company.jwr_monitoring.entity.Room;
import com.company.jwr_monitoring.repository.CategoryRepository;
import com.company.jwr_monitoring.repository.ParameterRepository;
import com.company.jwr_monitoring.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;
    private final ParameterRepository parameterRepository;

    @Override
    public void run(String... args) {

        initializeCategories();
        initializeRooms();
        initializeParameters();
    }

    private void initializeCategories() {
        if (categoryRepository.count() > 0) {
            return;
        }

        categoryRepository.saveAndFlush(Category.builder().name("Positive Room").build());
        categoryRepository.saveAndFlush(Category.builder().name("Negative Room").build());
        categoryRepository.saveAndFlush(Category.builder().name("Mezzanine Room").build());
        categoryRepository.saveAndFlush(Category.builder().name("Ante Room").build());
        categoryRepository.saveAndFlush(Category.builder().name("Truckdock Room").build());

    }

    private void initializeRooms() {

        if (roomRepository.count() > 0) {
            return;
        }

        Category positiveRoom = categoryRepository.findByName("Positive Room").orElseThrow();
        Category negativeRoom = categoryRepository.findByName("Negative Room").orElseThrow();
        Category mezzanineRoom = categoryRepository.findByName("Mezzanine Room").orElseThrow();
        Category anteRoom = categoryRepository.findByName("Ante Room").orElseThrow();
        Category truckDockRoom = categoryRepository.findByName("Truckdock Room").orElseThrow();

        for (int i = 1; i <= 30; i++) {
            roomRepository.save(
                    Room.builder().name("CS" + i).category(positiveRoom).build());
        }

        for (int i = 1; i <= 17; i++) {
            roomRepository.save(
                    Room.builder().name("FRC" + i).category(negativeRoom).build());
        }

        String[] mezzanineRooms = { "MEZ1A", "MEZ1B", "MEZ1C", "MEZ4" };
        for (String roomName : mezzanineRooms) {
            roomRepository.save(Room.builder().name(roomName).category(mezzanineRoom).build());
        }

        String[] anteRooms = { "AR1A", "AR1B", "AR2A", "AR2B", "AR3" };
        for (String roomName : anteRooms) {
            roomRepository.save(Room.builder().name(roomName).category(anteRoom).build());
        }

        String[] truckDockRooms = { "TD1A", "TD1B", "TD1C", "TD1D", "TD2A", "TD2B" };
        for (String roomName : truckDockRooms) {
            roomRepository.save(Room.builder().name(roomName).category(truckDockRoom).build());
        }

    }

    private void initializeParameters() {
        if (parameterRepository.count() > 0) {
            return;
        }
        parameterRepository.save(Parameter.builder().name("Temperature").uom("°C").type("REAL").build());
        parameterRepository.save(Parameter.builder().name("Energy").uom("Kwh").type("REAL").build());
        parameterRepository.save(Parameter.builder().name("RH").uom("%").type("REAL").build());

    }

}
