package com.company.jwr_monitoring.plc;

import org.apache.plc4x.java.api.PlcConnection;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.PlcReadResultDto;
import com.company.jwr_monitoring.entity.TagMaster;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlcReadService {
        private final PlcConnectionService plcConnectionService;

        public PlcReadResultDto readTag(TagMaster tag) {
                PlcConnection connection = null;
                try {
                        connection = plcConnectionService.getConnection(tag.getIpAddress(), tag.getPort());
                        Double value = switch (tag.getParameter().getType()) {
                                case INT -> readInt(connection, tag.getRegisterAddress());
                                case REAL -> readReal(connection, tag.getRegisterAddress());
                                case BOOL -> readBool(connection, tag.getRegisterAddress());
                        };
                        return new PlcReadResultDto(tag.getId(), tag.getTagName(), value);

                } catch (Exception ex) {
                        System.out.printf(
                                        "PLC Read Failed | Tag=%s | Register=%d | Error=%s%n",
                                        tag.getTagName(),
                                        tag.getRegisterAddress(),
                                        ex.getMessage());
                        return new PlcReadResultDto(tag.getId(), tag.getTagName(), 0.0);
                }
        }

        private Double readInt(PlcConnection connection, int registerAddress) throws Exception {
                int modbusAddress = registerAddress - 40000;
                var response = connection
                                .readRequestBuilder()
                                .addTagAddress("value", "holding-register:" + modbusAddress + ":INT")
                                .build()
                                .execute()
                                .get();

                return response.getInteger("value").doubleValue();
        }

        private Double readReal(PlcConnection connection, int registerAddress) throws Exception {
                int modbusAddress = registerAddress - 40000;
                var response = connection
                                .readRequestBuilder()
                                .addTagAddress("value", "holding-register:" + modbusAddress + ":REAL")
                                .build()
                                .execute()
                                .get();

                return response.getFloat("value").doubleValue();
        }

        private Double readBool(PlcConnection connection, int registerAddress) throws Exception {

                var response = connection
                                .readRequestBuilder()
                                .addTagAddress("value", "coil:" + registerAddress + ":BOOL")
                                .build()
                                .execute()
                                .get();

                return response.getBoolean("value") ? 1.0 : 0.0;
        }
}